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
import { PaymentTypes } from "../../enums/payments";

export interface PaymentForm {
  label: string;
  type: string;
  description?: string;
  amount: string;
}

interface LeadAddPaymentModalProps {
  paymentsModalOpened: boolean;
  paymentsModalHandlers: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
  onAddPayment: (payments: PaymentForm) => void;
  paymentTypes: PaymentTypes[];
}

function LeadAddPaymentModal({
  paymentsModalOpened,
  paymentsModalHandlers,
  onAddPayment,
  paymentTypes,
}: LeadAddPaymentModalProps) {
  const payment = useForm({
    initialValues: {
      label: "",
      type: "",
      description: "",
      amount: "",
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = paymentTypes.map((type) => (
    <Combobox.Option value={type} key={type}>
      {type}
    </Combobox.Option>
  ));

  const handlePaymentSubmit = () => {
    onAddPayment(payment.values);
    paymentsModalHandlers.close();
  };

  return (
    <>
      <Modal
        opened={paymentsModalOpened}
        onClose={paymentsModalHandlers.close}
        title="Add Payment"
      >
        <TextInput
          label="Label"
          placeholder="Enter Label"
          {...payment.getInputProps("label")}
          mb="sm"
        />
        {/* <TextInput
          label="Type"
          placeholder="Enter Type"
          {...payment.getInputProps("type")}
          mb="sm"
        /> */}
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            payment.setFieldValue("type", val);
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
              {payment.values.type || (
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
          {...payment.getInputProps("description")}
          mb="sm"
        />
        <TextInput
          label="Amount"
          placeholder="Enter Amount"
          {...payment.getInputProps("amount")}
          mb="sm"
        />
        <Group>
          <Button
            variant="outline"
            onClick={() => paymentsModalHandlers.close()}
          >
            Cancel
          </Button>
          <Button onClick={() => handlePaymentSubmit()}>Save</Button>
        </Group>
      </Modal>
    </>
  );
}

export default LeadAddPaymentModal;
