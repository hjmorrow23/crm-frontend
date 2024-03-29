import React from "react";
import { Text, Table, Button } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import type { Contact } from "./types";

interface LeadContactCardProps {
  contacts: Contact[];
  contactModalHandlers: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
}

function LeadContactCard({ contacts, contactModalHandlers }: LeadContactCardProps) {
  return (
    <>
      {contacts.length === 0 ? (
        <Text>No contacts found</Text>
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Full Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Primary</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {contacts.map((contact, index) => {
              return (
                <Table.Tr key={index}>
                  <Table.Td>{`${contact.firstName} ${contact.lastName}`}</Table.Td>
                  <Table.Td>{contact.email}</Table.Td>
                  <Table.Td>{contact.phone}</Table.Td>
                  <Table.Td>{contact.title}</Table.Td>
                  <Table.Td>
                    {contact.isPrimaryContact ? <IconCheck size={14} /> : ""}
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
      <Button onClick={contactModalHandlers.open}>Add Contact</Button>
    </>
  );
}

export default LeadContactCard;
