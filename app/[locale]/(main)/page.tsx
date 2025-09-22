import DashboardHome from '@/components/dashboard/DashboardHome';

// Simulate loading delay for testing
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function Page() {
  // Add artificial delay to see skeleton loading
  await delay(3000);
  
  return <DashboardHome />;
} 