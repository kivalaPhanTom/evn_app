import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { useLocalSearchParams } from 'expo-router'
import { Document } from '@/core/model/Document';
import createStyles from './Documents.styles'
import DocumentRow from './DocumentRow'
import DocumentIcon from './DocumentIcon'
import PdfViewer from '@/components/PDFViewer/PDFViewer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { getLegal } from '@/core/redux/domains/documents'
import { useAppTheme } from '@/core/hooks/use-app-theme'

export const MOCK_DOCUMENTS: Document[] = [
    {
        "id": 1,
        "name": "Giấy phép hoạt động điện lực",
        "linkFile": "https://mygenco3-api.genco3.com/files/output.pdf",
        "deadline": "2028-12-31T00:00:00",
        "isValid": true,
        "isUpcomingDue": true
    },
    {
        "id": 2,
        "name": "Giấy phép sử dụng mặt nước",
        "linkFile": "https://mygenco3-api.genco3.com/files/output.pdf",
        "deadline": "2025-12-31T00:00:00",
        "isValid": false,
        "isUpcomingDue": false
    },
      {
        "id": 3,
        "name": "Giấy phép sử dụng mặt nước",
        "linkFile": "https://mygenco3-api.genco3.com/files/output.pdf",
        "deadline": "2025-12-31T00:00:00",
        "isValid": true,
        "isUpcomingDue": false
    }
]
function DocumentSection() {
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const dispatch = useAppDispatch()
    const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
    const { isLoadingLegal, legal } = useAppSelector((state: RootState) => state.documentSlice)
    const scheme = useAppTheme()
    const isDark = scheme === 'dark'
    const styles = createStyles(isDark)

    const tableHeader = (
        <View style={styles.docHeader}>
            <View style={styles.docHeaderIcon}>
                <DocumentIcon size={18} color={isDark ? '#4ADE80' : '#16A34A'} />
            </View>
            <Text style={styles.docHeaderText}>DANH SÁCH GIẤY PHÉP</Text>
        </View>
    );

    const data = legal.map((item, i) => ({
        ...item,
        id: i,
    }))

    const onSelect = (doc: Document) => {
        // Xử lý khi chọn tài liệu, ví dụ mở liên kết
        console.log('Selected document:', doc);
        setSelectedDoc(doc);
        // Mở liên kết tài liệu
        // Linking.openURL(doc.linkFile);
    }

    useEffect(() => {
        dispatch(getLegal())
    }, [dispatch, countRefesh])

    return (
        <SectionContainer
            title="Pháp lý"
            titleIcon={<DocumentIcon size={18} color="#2563EB" />}
        >
            <AnimatedCardContainer>
                <View>
                    {data.length === 0 ? (
                        <Text style={styles.emptyText}>Không có tài liệu pháp lý nào.</Text>
                    ) : (<View style={styles.container}>
                        {tableHeader}
                        {data.map((doc, i) => (
                            <React.Fragment key={doc.id}>
                                <DocumentRow
                                    doc={doc}
                                    onPress={onSelect}
                                />
                                {i < data.length - 1 && <View style={styles.separator} />}
                            </React.Fragment>
                        ))}
                    </View>)}

                    {/* PDF Modal Viewer */}
                    {selectedDoc && (
                        <PdfViewer
                            doc={selectedDoc}
                            onClose={() => setSelectedDoc(null)}
                        />
                    )}
                </View>
            </AnimatedCardContainer>

        </SectionContainer>
    )
}

export default DocumentSection