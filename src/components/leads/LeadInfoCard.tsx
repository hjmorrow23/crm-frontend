import React from "react";
import { Text, Group, Button } from "@mantine/core";
import { LeadInfo } from "./types";

interface LeadInfoCardProps {
  currentLeadInfo: LeadInfo;
  updateIsEditing: (isEditing: boolean) => void;
}

function LeadInfoCard({ currentLeadInfo, updateIsEditing }: LeadInfoCardProps) {
  return (
    <>
      <Text>{currentLeadInfo?.name}</Text>
      <Text>{currentLeadInfo?.addressLine1}</Text>
      <Text>{currentLeadInfo?.addressLine2}</Text>
      <Text>{currentLeadInfo?.city}</Text>
      <Text>{currentLeadInfo?.state}</Text>
      <Text>{currentLeadInfo?.zip}</Text>
      <Text>{currentLeadInfo?.email}</Text>
      <Text>{currentLeadInfo?.phone}</Text>
      <Group>
        <Button color="blue" onClick={() => updateIsEditing(true)}>
          Edit
        </Button>
      </Group>
    </>
  );
}

export default LeadInfoCard;
