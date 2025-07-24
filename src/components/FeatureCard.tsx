import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export default function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ textAlign: 'center' }}>
        {icon}
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}
