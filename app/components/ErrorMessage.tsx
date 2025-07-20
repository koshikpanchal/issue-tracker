import { Callout } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) {
    return null;
  }

  return (
    <div>
      <Callout.Root color="red" className="mb-5">
        {children}
      </Callout.Root>
    </div>
  );
};

export default ErrorMessage;
