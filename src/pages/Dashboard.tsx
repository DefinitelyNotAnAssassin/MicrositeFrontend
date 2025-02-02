import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from './Dashboard/Navbar';

export default function Dashboard() {
    const { user, loading, checkAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                navigate('/login');
            }
        };
        init();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-10">
                <PageHeader>
                    <PageHeaderHeading>Dashboard</PageHeaderHeading>
                </PageHeader>
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome, {user?.firstname}</CardTitle>
                        <CardDescription>
                            Program: {user?.program} | Department: {user?.department}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Use the navigation menu to access different sections.</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
