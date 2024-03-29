import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads, deleteLead } from '../../store/actions/lead';
import { Card, Text, Group, Button } from '@mantine/core';
import styled from 'styled-components';

const LeadsWrapper = styled.div`
    display: flex;
    flex-direction: column;

    .mantine-Card-root {
        width: 20%;
    }
`;

const LeadListGrid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`;

export const Leads = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getLeads());
    }, []);
    const { leads } = useSelector(state => state.lead);

    const handleDeleteLead = (id) => {
        dispatch(deleteLead(id)).then(() => {
            dispatch(getLeads());
        });
    };

    const leadItems = leads.map((lead, index) => {
        return (
            <Card shadow="sm" padding="lg" radius="md" key={index} withBorder>
                <Text fw={500}>{lead.name}</Text>
                <Text size="sm" c="dimmed">{lead.email}</Text>
                <Group>
                    <Button color="red" onClick={() => handleDeleteLead(lead._id)}>Delete</Button>
                    <Button color="blue" onClick={() => navigate(`/leads/${lead._id}`)}>Edit</Button>
                </Group>
            </Card>
        )
    })

    return (
        <LeadsWrapper>
            <Group>
                <h1>Leads</h1>
                <Button leftSection="" onClick={() => navigate('/leads/creating')}>Add Lead</Button>
            </Group>
            
            <LeadListGrid>
                {leadItems}
            </LeadListGrid>
        </LeadsWrapper>
    );
}
