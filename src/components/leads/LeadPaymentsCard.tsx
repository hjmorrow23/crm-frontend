import React from "react";
import { Text, Table, Button } from "@mantine/core";
import type { Payment } from "./types";

interface LeadPaymentsCardProps {
  payments: Payment[];
  paymentsModalHandlers: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
}

export default function LeadPaymentsCard({
  payments,
  paymentsModalHandlers,
}: LeadPaymentsCardProps) {
  return (
    <>
      {payments.length === 0 ? (
        <Text>No payments found</Text>
      ) : (
        <>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Label</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {payments.map((payment, index) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{payment.label}</Table.Td>
                    <Table.Td>{payment.type}</Table.Td>
                    <Table.Td>{payment.description}</Table.Td>
                    <Table.Td>{payment.amount}</Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </>
      )}
      <Button onClick={paymentsModalHandlers.open}>Add Payment</Button>
    </>
  );
}
