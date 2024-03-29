import React from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Group,
  Button,
  Input,
  InputBase,
  Combobox,
  useCombobox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { InteractionTypes } from "../../enums/interactions";

export interface InteractionForm {
  label: string;
  type: string;
  description: string;
}

interface LeadAddInteractionModalProps {
  interactionsModalOpened: boolean;
  interactionsModalHandlers: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
  onAddInteraction: (interactions: InteractionForm) => void;
  interactionTypes: InteractionTypes[];
}

function LeadAddInteractionModal({
  interactionsModalOpened,
  interactionsModalHandlers,
  onAddInteraction,
  interactionTypes,
}: LeadAddInteractionModalProps) {
  const interaction = useForm({
    initialValues: {
      label: "",
      type: "",
      description: "",
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = interactionTypes.map((type) => (
    <Combobox.Option value={type} key={type}>
      {type}
    </Combobox.Option>
  ));

  const handleInteractionSubmit = () => {
    onAddInteraction(interaction.values);
    interactionsModalHandlers.close();
  };

  return (
    <>
      <Modal
        opened={interactionsModalOpened}
        onClose={interactionsModalHandlers.close}
        title="Add Interaction"
      >
        <TextInput
          label="Label"
          placeholder="Enter Label"
          {...interaction.getInputProps("label")}
          mb="sm"
        />
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            interaction.setFieldValue("type", val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {interaction.values.type || (
                <Input.Placeholder>Pick a type</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <Textarea
          label="Description"
          placeholder="Enter Description"
          {...interaction.getInputProps("description")}
          mb="sm"
        />
        <Group>
          <Button
            variant="outline"
            onClick={() => interactionsModalHandlers.close()}
          >
            Cancel
          </Button>
          <Button onClick={() => handleInteractionSubmit()}>Save</Button>
        </Group>
      </Modal>
    </>
  );
}

export default LeadAddInteractionModal;
