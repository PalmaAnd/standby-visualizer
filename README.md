# Standby System Visualization

![License](https://img.shields.io/github/license/PalmaAnd/standby-visualizer)
![Last Commit](https://img.shields.io/github/last-commit/PalmaAnd/standby-visualizer)
![Deployment Status](https://img.shields.io/github/deployments/PalmaAnd/standby-visualizer/github-pages)

## Overview

The Standby System Visualization tool is an interactive web application designed to help users understand and explore different standby system configurations commonly used in high-availability architectures. It provides a visual representation of cold, warm, and hot standby systems, allowing users to interact with the system and observe its behavior under various conditions.

![Application Screenshot](/public/preview.png)

## Features

- **Interactive Visualization**: Explore cold, warm, and hot standby configurations with real-time server status updates.
- **Configurable Parameters**: Adjust check intervals, simulate server failures and recoveries, and modify performance metrics.
- **Cost Estimation**: Utilize the built-in calculator to estimate costs based on cloud provider, instance size, storage type, and network usage.
- **Multi-Region Disaster Recovery**: Simulate disaster scenarios across multiple regions to understand system resilience.
- **Comparison Mode**: Compare different standby configurations to determine the most efficient setup.
- **Predefined Scenarios**: Quickly explore common scenarios with predefined settings.
- **Responsive Design**: Access the tool seamlessly on both desktop and mobile devices.

## Technologies Used

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/)
- [shadcn/ui components](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/PalmaAnd/standby-visualizer.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd standby-visualizer
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

5. **Access the application:**

    Open your browser and visit `http://localhost:3000` to interact with the application.

## Usage

1. **Select Standby Type**: Choose between cold, warm, and hot standby configurations using the control panel.

2. **Manage Server Status**: Toggle the primary and secondary servers on and off to observe system behavior under different conditions.

3. **Simulate Server Health Issues**: Introduce health anomalies to servers to see how the system responds.

4. **Explore Predefined Scenarios**: Select from scenarios like primary failure, load balancing, or disaster recovery to understand specific situations.

5. **Analyze Performance Metrics**: Monitor how different configurations impact response time and throughput.

6. **Estimate Costs**: Input parameters into the cost calculator to assess financial implications of various configurations.

7. **Simulate Multi-Region Scenarios**: Add multiple regions and simulate disasters to evaluate system resilience.

## Contributing

We welcome contributions to the Standby System Visualization project! To get started:

1. **Fork the repository**.

2. **Create a new branch** for your feature or bug fix:

    ```bash
    git checkout -b feature-name
    ```

3. **Commit your changes**:

    ```bash
    git commit -m 'Add new feature'
    ```

4. **Push to the branch**:

    ```bash
    git push origin feature-name
    ```

5. **Open a pull request** detailing your changes.

Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions, issues, or suggestions, please open an issue on the [GitHub repository](https://github.com/PalmaAnd/standby-visualizer/issues) or contact the maintainer directly.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

Thank you for your interest in the Standby System Visualization tool. We hope it helps you better understand and plan high-availability architectures!
