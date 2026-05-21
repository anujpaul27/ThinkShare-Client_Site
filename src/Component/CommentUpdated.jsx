"use client";

import React from "react";
import { Button, Modal, useOverlayState } from "@heroui/react";

export default function InfoModal() {
  // useOverlayState handles open, close, and toggle states cleanly
  const modalState = useOverlayState();

  return (
    <div className="p-4">
      {/* Trigger Button */}
      <Button color="primary" onPress={modalState.open}>
        Show Information
      </Button>

      {/* Modal Component Tree */}
      <Modal state={modalState}>
        {/* Backdrop variant options: "opaque", "blur", "transparent" */}
        <Modal.Backdrop variant="blur" />
        
        {/* Container sets the overall wrapper size: "xs", "sm", "md", "lg", etc. */}
        <Modal.Container size="md">
          <Modal.Dialog>
            {/* Close button icon automatically rendered in the top corner */}
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
              {/* slot="close" automatically wires up the closing trigger */}
              <Button variant="flat" slot="close">
                Dismiss
              </Button>
              <Button color="primary" onPress={modalState.close}>
                Understood
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </div>
  );
}
