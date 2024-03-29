import React from "react";
import { Text, Table, Button } from "@mantine/core";
import type { Interaction } from "./types";

interface LeadInteractionsCardProps {
  interactions: Interaction[];
  interactionsModalHandlers: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
}

export default function LeadInteractionsCard({
  interactions,
  interactionsModalHandlers,
}: LeadInteractionsCardProps) {
  return (
    <>
      {interactions.length === 0 ? (
        <Text>No interactions found</Text>
      ) : (
        <>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Label</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Description</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {interactions.map((interaction, index) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{interaction.label}</Table.Td>
                    <Table.Td>{interaction.type}</Table.Td>
                    <Table.Td>{interaction.description}</Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </>
      )}
      <Button onClick={interactionsModalHandlers.open}>Add Interaction</Button>
    </>
  );
}
