import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApprovalModal from "../../app/components/ApprovalModal";

const mockPendingCalculations = {
  homePrice: 500000,
  downPayment: 100000,
  interestRate: 6.5,
  loanTerm: 30,
  zipCode: "90210",
};

describe("ApprovalModal", () => {
  it("returns null when isOpen is false", () => {
    const { container } = render(
      <ApprovalModal
        isOpen={false}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it("returns null when pendingCalculations is null", () => {
    const { container } = render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={null}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it("renders modal when isOpen is true and has pendingCalculations", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByText("Simulation Approval Required")).toBeInTheDocument();
  });

  it("renders the modal header and description", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByText("Simulation Approval Required")).toBeInTheDocument();
    expect(screen.getByText("Please review the simulation parameters below")).toBeInTheDocument();
    expect(screen.getByText("The AI wants to run a mortgage simulation with the following parameters:")).toBeInTheDocument();
  });

  it("displays home price formatted as currency", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByText("Home Price")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
  });

  it("displays down payment formatted as currency", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByText("Down Payment")).toBeInTheDocument();
    expect(screen.getByText("$100,000")).toBeInTheDocument();
  });

  it("displays interest rate as percentage", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByText("Interest Rate")).toBeInTheDocument();
    expect(screen.getByText("6.5%")).toBeInTheDocument();
  });

  it("displays loan term in years", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByText("Loan Term")).toBeInTheDocument();
    expect(screen.getByText("30 years")).toBeInTheDocument();
  });

  it("displays zip code", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByText("ZIP Code")).toBeInTheDocument();
    expect(screen.getByText("90210")).toBeInTheDocument();
  });

  it("renders approve and deny buttons", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deny" })).toBeInTheDocument();
  });

  it("calls onApprove when approve button is clicked", async () => {
    const onApprove = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={onApprove}
        onDeny={() => {}}
      />
    );
    
    await user.click(screen.getByRole("button", { name: "Approve" }));
    
    expect(onApprove).toHaveBeenCalled();
  });

  it("calls onDeny when deny button is clicked", async () => {
    const onDeny = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={false}
        onApprove={() => {}}
        onDeny={onDeny}
      />
    );
    
    await user.click(screen.getByRole("button", { name: "Deny" }));
    
    expect(onDeny).toHaveBeenCalled();
  });

  it("shows processing state on approve button", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={true}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByRole("button", { name: "Processing..." })).toBeInTheDocument();
  });

  it("disables buttons when processing", () => {
    render(
      <ApprovalModal
        isOpen={true}
        pendingCalculations={mockPendingCalculations}
        isProcessing={true}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    );
    
    expect(screen.getByRole("button", { name: "Processing..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Deny" })).toBeDisabled();
  });
});
