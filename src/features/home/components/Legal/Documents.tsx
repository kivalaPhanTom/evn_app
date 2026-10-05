import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { Document } from '@/core/model/Document';
import createStyles from './Documents.styles'
import DocumentRow from './DocumentRow'
import DocumentIcon from './DocumentIcon'
import PdfViewer from '@/components/PDFViewer/PDFViewer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { getLegal } from '@/core/redux/domains/documents'
import { useAppTheme } from '@/core/hooks/use-app-theme'

type DocumentWithIndex = Document & { id: number }

function DocumentSection() {
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const dispatch = useAppDispatch()
    const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
    const { isLoadingLegal, legal } = useAppSelector((state: RootState) => state.documentSlice)
    const scheme = useAppTheme()
    const isDark = scheme === 'dark'
    const styles = createStyles(isDark)

    const tableHeader = useMemo(() => (
        <View style={styles.docHeader}>
            <View style={styles.docHeaderIcon}>
                <DocumentIcon size={18} color={isDark ? '#4ADE80' : '#16A34A'} />
            </View>
            <Text style={styles.docHeaderText}>DANH SÁCH GIẤY PHÉP</Text>
        </View>
    ), [styles, isDark])

    const data = useMemo<DocumentWithIndex[]>(
        () => legal.map((item, i) => ({ ...item, id: i })),
        [legal],
    )

    const onSelect = useCallback((doc: Document) => {
        console.log('Selected document:', doc);
        setSelectedDoc(doc);
    }, [])

    useEffect(() => {
        dispatch(getLegal())
    }, [dispatch, countRefesh])

    const renderItem: ListRenderItem<DocumentWithIndex> = useCallback(
        ({ item, index }) => (
            <View>
                <DocumentRow doc={item} onPress={onSelect} />
                {index < data.length - 1 && <View style={styles.separator} />}
            </View>
        ),
        [data.length, onSelect, styles.separator],
    )

    const keyExtractor = useCallback((item: DocumentWithIndex) => String(item.id), [])

    return (
        <SectionContainer
            title="Pháp lý"
            titleIcon={<DocumentIcon size={18} color="#2563EB" />}
        >
            <AnimatedCardContainer>
                <View>
                    {data.length === 0 ? (
                        <Text style={styles.emptyText}>Không có tài liệu pháp lý nào.</Text>
                    ) : (
                        <View style={styles.container}>
                            {tableHeader}
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                removeClippedSubviews
                                initialNumToRender={6}
                                windowSize={5}
                                maxToRenderPerBatch={4}
                                scrollEnabled={false}
                            />
                        </View>
                    )}

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

export default React.memo(DocumentSection)
