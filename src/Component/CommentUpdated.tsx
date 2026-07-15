"use client";

import React from "react";
import { Button, Modal, useOverlayState } from "@heroui/react";

export default function InfoModal() {
  const modalState = useOverlayState();

  return (
    <div className="p-4">
      {/* Trigger Button - Best placed inside Modal for automatic behavior */}
      <Modal state={modalState}>
        <Button >
          Show Information
        </Button>

        {/* Modal Content */}
        <Modal.Backdrop variant="blur" />

        <Modal.Container size="md">
          <Modal.Dialog>
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-xl font-bold">
                Idea Submission Guidelines
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="text-sm text-default-600 space-y-2">
              <p>
                Welcome! Please follow these simple rules before posting your idea:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure the idea does not already exist.</li>
                <li>Keep the description concise and clean.</li>
                <li>Add relevant category tags to increase visibility.</li>
              </ul>
            </Modal.Body>

            <Modal.Footer className="gap-2">
              <Button  slot="close">
                Dismiss
              </Button>
              <Button  >
                Understood
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </div>
  );
}