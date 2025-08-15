# Success Plan Manager

A modern web application for creating, managing, and sharing customer success plans. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Success Plan Management**: Create and manage comprehensive success plans for customers
- **Objectives Tracking**: Track objectives with progress, KPIs, and status indicators
- **Stakeholder Management**: Manage stakeholders with RACI matrix
- **External Sharing**: Share read-only views with external stakeholders
- **Data Export/Import**: Export and import success plan data as JSON
- **PDF Report Generation**: Generate customizable PDF reports for QBRs and EBRs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd success-plan-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Usage

### Creating Objectives
- Click "Add objective" to create new objectives
- Set owner, due date, and track progress
- Add KPIs to measure success

### Managing Success Plan
- Toggle health status between "On track", "Needs attention", and "At risk"
- Update stakeholders and their RACI roles
- Track completed objectives and value realized

### Sharing
- Click "Share" to generate a shareable link for external stakeholders
- External view provides read-only access to the success plan

### Data Management
- **Export**: Click "Export" to download success plan data as JSON
- **Import**: Use the dropdown menu to import previously exported data
- **Reset**: Clear all data and start fresh

### Report Generation
- Access Report Builder in the right sidebar
- Select report preset (QBR, EBR, Implementation)
- Choose sections to include
- Generate and download PDF report

## Deployment

### Netlify

This project is configured for easy deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the build settings
3. Deploy with one click

The project includes:
- `netlify.toml` for build configuration
- `_redirects` for React Router support
- Optimized build settings

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Routing
- **jsPDF** - PDF generation
- **date-fns** - Date formatting
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Top navigation
│   ├── MetaHeader.tsx  # Plan overview
│   ├── Objectives.tsx  # Objectives table
│   ├── Details.tsx     # Details panel with tabs
│   └── ...
├── store/              # State management
│   └── useStore.ts     # Zustand store
├── types/              # TypeScript types
│   └── index.ts        # Data models
├── App.tsx             # Main app component
└── ExternalView.tsx    # External view route
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
