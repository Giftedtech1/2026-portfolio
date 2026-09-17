import { WebCallHubWidget } from '@webcallhub/widget/dist/react.js';

/**
 * WebCallHub floating call button.
 * Renders bottom-right on every page — outside the main content flow.
 */
const CallButton = () => {
  return (
    <WebCallHubWidget
      siteKey="a8e05595-4f42-4e8f-9baa-bf1427aa781a"
      position="bottom-right"
    />
  );
};

export default CallButton;
