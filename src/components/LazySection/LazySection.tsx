import { View } from 'react-native';
import { useEffect, useState } from 'react';

type LazySectionProps = {
    shouldLoad: boolean;
    children: React.ReactNode;
    minHeight?: number;
};

export function LazySection({
    shouldLoad,
    children,
    minHeight = 200,
}: LazySectionProps) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (shouldLoad) {
            setLoaded(true);
        }
    }, [shouldLoad]);

    if (!loaded) {
        return <View style={{ minHeight }} />;
    }

    return <>{children}</>;
}
