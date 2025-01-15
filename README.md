# Standby System Visualization

## Overview

The Standby System Visualization tool is an interactive web application designed to help users understand and explore different standby system configurations commonly used in high-availability architectures. It provides a visual representation of cold, warm, and hot standby systems, allowing users to interact with the system and observe its behavior under various conditions.

## Features

-   Interactive visualization of cold, warm, and hot standby systems
-   Real-time updates of server status and health
-   Configurable check intervals for each standby type
-   Simulated server failures and recovery
-   Performance metrics simulation
-   Cost estimation calculator
-   Multi-region disaster recovery scenario
-   Comparison mode for different standby configurations
-   Predefined scenarios for quick exploration
-   Responsive design for both desktop and mobile devices

## Technologies Used

-   React
-   Next.js
-   TypeScript
-   Tailwind CSS
-   Framer Motion
-   Lucide React Icons
-   shadcn/ui components

## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   npm or yarn

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/yourusername/standby-visualizer.git
    ```

2. Navigate to the project directory:

    ```
    cd standby-visualizer
    ```

3. Install dependencies:

    ```
    npm install
    ```

    or

    ```
    yarn install
    ```

4. Start the development server:

    ```
    npm run dev
    ```

    or

    ```
    yarn dev
    ```

5. Open your browser and visit `http://localhost:3000` to see the application running.

## Usage

1. **Standby Type Selection**: Choose between cold, warm, and hot standby configurations using the radio buttons in the control panel.

2. **Server Status**: Toggle the primary and secondary servers on and off to see how the system behaves in different states.

3. **Server Health**: Simulate server health issues by toggling the health status of each server.

4. **Predefined Scenarios**: Use the dropdown menu to select from predefined scenarios like primary failure, load balancing, or disaster recovery.

5. **Performance Metrics**: Observe how different configurations affect the simulated response time and throughput.

6. **Cost Estimation**: Use the cost estimation calculator to get an idea of the financial implications of different standby configurations.

7. **Multi-Region Scenario**: Explore a more complex, geographically distributed architecture in the multi-region disaster recovery scenario.

8. **Comparison Mode**: Toggle the comparison mode to view different standby configurations side-by-side.

## Contributing

We welcome contributions to the Standby System Visualization project! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions, issues, or suggestions, please open an issue on the GitHub repository or contact the maintainer directly.

## Acknowledgements

-   [Next.js](https://nextjs.org/)
-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Framer Motion](https://www.framer.com/motion/)
-   [Lucide Icons](https://lucide.dev/)
-   [shadcn/ui](https://ui.shadcn.com/)

Thank you for your interest in the Standby System Visualization tool. We hope it helps you better understand and plan high-availability architectures!
