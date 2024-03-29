import React from "react";
import { Modal, TextInput, Group, Button, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Contact } from "./types";

export interface ContactForm {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  isPrimaryContact: boolean;
}

interface LeadAddContactModalProps {
  contactModalOpened: boolean;
  contactModalHandlers: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
  onAddContact: (contact: ContactForm) => void;
}

function LeadAddContactModal({
  contactModalOpened,
  contactModalHandlers,
  onAddContact,
}: LeadAddContactModalProps) {
  const contact = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      isPrimaryContact: false,
    },
  });

  const handleContactSubmit = () => {
    onAddContact(contact.values);
    contactModalHandlers.close();
  };

  return (
    <>
      <Modal
        opened={contactModalOpened}
        onClose={contactModalHandlers.close}
        title="Add Contact"
      >
        <TextInput
          label="First Name"
          placeholder="Enter First Name"
          {...contact.getInputProps("firstName")}
          mb="sm"
        />
        <TextInput
          label="Last Name"
          placeholder="Enter Last Name"
          {...contact.getInputProps("lastName")}
          mb="sm"
        />
        <TextInput
          label="Email"
          placeholder="Enter Email"
          {...contact.getInputProps("email")}
          mb="sm"
        />
        <TextInput
          label="Title"
          placeholder="Enter Title"
          {...contact.getInputProps("title")}
          mb="sm"
        />
        <TextInput
          label="Phone"
          placeholder="Enter Phone"
          {...contact.getInputProps("phone")}
          mb="sm"
        />
        <TextInput
          label="Address Line 1"
          placeholder="Enter Address Line 1"
          {...contact.getInputProps("addressLine1")}
          mb="sm"
        />
        <TextInput
          label="Address Line 2"
          placeholder="Enter Address Line 2"
          {...contact.getInputProps("addressLine2")}
          mb="sm"
        />
        <TextInput
          label="City"
          placeholder="Enter City"
          {...contact.getInputProps("city")}
          mb="sm"
        />
        <TextInput
          label="State"
          placeholder="Enter State"
          {...contact.getInputProps("state")}
          mb="sm"
        />
        <TextInput
          label="Zip"
          placeholder="Enter Zip"
          {...contact.getInputProps("zip")}
          mb="sm"
        />
        <Switch
          label="Is this contact the primary contact?"
          {...contact.getInputProps("isPrimaryContact")}
          mb="sm"
        />
        <Group>
          <Button
            variant="outline"
            onClick={() => contactModalHandlers.close()}
          >
            Cancel
          </Button>
          <Button onClick={() => handleContactSubmit()}>Save</Button>
        </Group>
      </Modal>
    </>
  );
}

export default LeadAddContactModal;
