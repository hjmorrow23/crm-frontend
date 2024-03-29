import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TextInput, Group, Button } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import type { LeadInfo } from "./types";

interface LeadInfoFormProps {
  currentLeadInfo: LeadInfo;
  onSubmitForm: (values: LeadInfo) => void;
  onDoneEditing: () => void;

}

export function LeadInfoForm({ currentLeadInfo, onSubmitForm, onDoneEditing }: LeadInfoFormProps) {
  const navigate = useNavigate();
  const leadInfo = useForm({
    initialValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    },
    // validate: {
    //     name: isNotEmpty('Name is required'),
    //     addressLine1: isNotEmpty('Address Line 1 is required'),
    //     city: isNotEmpty('City is required'),
    //     state: isNotEmpty('State is required'),
    //     zip: isNotEmpty('Zip is required'),
    //     email: isNotEmpty('Email is required'),
    //     phone: isNotEmpty('Phone is required'),
    // },
  });
  useEffect(() => {
    if (currentLeadInfo) {
      leadInfo.setValues(currentLeadInfo);
    }
  }, [currentLeadInfo]);
  return (
    <>
      <TextInput
        label="Name"
        placeholder="Enter Name"
        {...leadInfo.getInputProps("name")}
        mb="sm"
      />
      <TextInput
        label="Address Line 1"
        placeholder="Enter Address Line 1"
        {...leadInfo.getInputProps("addressLine1")}
        mb="sm"
      />
      <TextInput
        label="Address Line 2"
        placeholder="Enter Address Line 2"
        {...leadInfo.getInputProps("addressLine2")}
        mb="sm"
      />
      <TextInput
        label="City"
        placeholder="Enter City"
        {...leadInfo.getInputProps("city")}
        mb="sm"
      />
      <TextInput
        label="State"
        placeholder="Enter State"
        {...leadInfo.getInputProps("state")}
        mb="sm"
      />
      <TextInput
        label="Zip"
        placeholder="Enter Zip"
        {...leadInfo.getInputProps("zip")}
        mb="sm"
      />
      <TextInput
        label="Email"
        placeholder="Enter Email"
        {...leadInfo.getInputProps("email")}
        mb="sm"
      />
      <TextInput
        label="Phone"
        placeholder="Enter Phone"
        {...leadInfo.getInputProps("phone")}
        mb="sm"
      />
      <Group>
        <Button onClick={() => onSubmitForm(leadInfo.values)}>Save</Button>
        <Button variant="outline" onClick={() => onDoneEditing()}>
          Cancel
        </Button>
      </Group>
    </>
  );
}
