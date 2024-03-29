import React from "react";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLead, updateLead, createLead } from "../../store/actions/lead";
import { Card, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LeadInfoForm } from "./LeadInfoForm";
import LeadInfoCard from "./LeadInfoCard";
import LeadContactCard from "./LeadContactCard";
import LeadInteractionsCard from "./LeadInteractionsCard";
import LeadPaymentsCard from "./LeadPaymentsCard";
import LeadAddContactModal, { ContactForm } from "./LeadAddContactModal";
import LeadAddInteractionModal, {
  InteractionForm,
} from "./LeadAddInteractionModal";
import LeadAddPaymentModal, { PaymentForm } from "./LeadAddPaymentModal";
import type { LeadInfo, Contact, Interaction, Payment } from "./types";
import styled from "styled-components";
import { getInteractionTypes } from "../../store/actions/interactions";
import { getPaymentTypes } from "../../store/actions/payments";
import { InteractionTypes } from "../../enums/interactions";
import { PaymentTypes } from "../../enums/payments";

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

export const LeadDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [isEditingLeadInfo, setIsEditingLeadInfo] = useState<boolean>(false);
  const { id } = useParams();
  const creating: boolean = id === "creating";
  const [contactModalOpened, contactModalHandlers] = useDisclosure(false);
  const [interactionsModalOpened, interactionsModalHandlers] =
    useDisclosure(false);
  const [paymentsModalOpened, paymentsModalHandlers] = useDisclosure(false);

  useEffect(() => {
    if (id !== "creating") {
      dispatch(getLead(id));
    }
  }, []);

  const { currentLead } = useSelector((state: any) => state.lead);
  const [contacts, setContacts] = useState(
    currentLead?.contacts || ([] as Contact[])
  );
  const [currentLeadInfo, setCurrentLeadInfo] = useState({} as LeadInfo);
  const [interactions, setInteractions] = useState(
    currentLead?.interactions || ([] as Interaction[])
  );
  const interactionTypes: InteractionTypes[] = Object.values(InteractionTypes);
  const paymentTypes: PaymentTypes[] = Object.values(PaymentTypes);
  const [payments, setPayments] = useState(
    currentLead?.payments || ([] as Payment[])
  );

  useEffect(() => {
    if (currentLead) {
      setCurrentLeadInfo({
        name: currentLead.name,
        addressLine1: currentLead.addressLine1,
        addressLine2: currentLead.addressLine2,
        city: currentLead.city,
        state: currentLead.state,
        zip: currentLead.zip,
        email: currentLead.email,
        phone: currentLead.phone,
      });
      setContacts(currentLead.contacts);
      setInteractions(currentLead.interactions);
      setPayments(currentLead.payments);
    }
  }, [currentLead]);

  const handleLeadInfoSubmit = (submittedLeadInfo: LeadInfo) => {
    const formattedLead = {
      ...currentLead,
      ...submittedLeadInfo,
    };

    if (creating) {
      dispatch(createLead(formattedLead)).then(() => {
        setIsEditingLeadInfo(false);
      });
    } else {
      dispatch(updateLead(id, formattedLead)).then(() => {
        dispatch(getLead(id)).then(() => {
          setIsEditingLeadInfo(false);
        });
      });
    }
  };

  const handleAddContact = (contact: ContactForm) => {
    const newContact: Contact = {
      ...contact,
      company: currentLead._id,
    };

    setContacts([...contacts, newContact]);

    const formattedLead = {
      ...currentLead,
      contacts: [...contacts, newContact],
    };
    dispatch(updateLead(id, formattedLead)).then(() => {
      dispatch(getLead(id));
    });
  };
  const handleAddInteraction = (interaction: InteractionForm) => {
    setInteractions([...interactions, interaction]);

    const formattedLead = {
      ...currentLead,
      interactions: [...interactions, interaction],
    };

    console.log(formattedLead);
    dispatch(updateLead(id, formattedLead)).then(() => {
      dispatch(getLead(id));
    });
  };
  const handleAddPayment = (payment: PaymentForm) => {
    const newPayment: Payment = {
      ...payment,
      paymentDate: new Date().toISOString(),
    };

    setPayments([...payments, newPayment]);

    const formattedLead = {
      ...currentLead,
      payments: [...payments, newPayment],
    };

    console.log(formattedLead);
    dispatch(updateLead(id, formattedLead)).then(() => {
      dispatch(getLead(id));
    });
  };

  return (
    <DetailWrapper>
      <Group
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            width: "50%",
          },
        }}
      >
        <Card
          styles={{
            root: {
              marginBottom: "1rem",
              width: "100%",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
            },
          }}
        >
          <h1>Lead Detail</h1>
          {isEditingLeadInfo ? (
            <LeadInfoForm
              currentLeadInfo={currentLeadInfo}
              onSubmitForm={handleLeadInfoSubmit}
              onDoneEditing={() => setIsEditingLeadInfo(false)}
            />
          ) : (
            <LeadInfoCard
              currentLeadInfo={currentLeadInfo}
              updateIsEditing={(val: boolean) => setIsEditingLeadInfo(val)}
            />
          )}
        </Card>
        <Card
          styles={{
            root: {
              width: "100%",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
            },
          }}
        >
          <h2>Contacts</h2>
          <LeadContactCard
            contacts={contacts}
            contactModalHandlers={contactModalHandlers}
          />
        </Card>
      </Group>
      <Group
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            width: "50%",
          },
        }}
      >
        <Card
          styles={{
            root: {
              marginBottom: "1rem",
              width: "100%",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
            },
          }}
        >
          <h2>Interactions</h2>
          <LeadInteractionsCard
            interactions={interactions}
            interactionsModalHandlers={interactionsModalHandlers}
          />
        </Card>
        <Card
          styles={{
            root: {
              marginBottom: "1rem",
              width: "100%",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
            },
          }}
        >
          <h2>Payments</h2>
          <LeadPaymentsCard
            payments={payments}
            paymentsModalHandlers={paymentsModalHandlers}
          />
        </Card>
      </Group>
      <LeadAddContactModal
        contactModalOpened={contactModalOpened}
        contactModalHandlers={contactModalHandlers}
        onAddContact={handleAddContact}
      />
      <LeadAddInteractionModal
        interactionsModalOpened={interactionsModalOpened}
        interactionsModalHandlers={interactionsModalHandlers}
        onAddInteraction={handleAddInteraction}
        interactionTypes={interactionTypes}
      />
      <LeadAddPaymentModal
        paymentsModalOpened={paymentsModalOpened}
        paymentsModalHandlers={paymentsModalHandlers}
        onAddPayment={handleAddPayment}
        paymentTypes={paymentTypes}
      />
    </DetailWrapper>
  );
};
