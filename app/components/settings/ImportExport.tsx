import React from 'react';
import {Alert} from 'react-native';
import {StorageAccessFramework} from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import Panel from '../ui/Panel';
import {PrimaryText, SecondaryHeader} from '../ui/Text';
import {Button} from '../ui/Button';
import utils from '../../styles-utilities';
import Separator from '../ui/Separator';
import {getExportData, setImportedData} from '../../lib/import-export';

async function importData() {
    try {
        const result = await DocumentPicker.getDocumentAsync();
        if (result.type === 'success') {
            const contents = await StorageAccessFramework.readAsStringAsync(
                result.uri
            );
            const json = JSON.parse(contents);
            setImportedData(json);
            Alert.alert(
                'Success',
                `Imported ${json.entries.length} entries and ${json.trophies.length} trophies.`
            );
        }
    } catch (e) {
        Alert.alert('Error', 'Import failed.');
    }
}

async function exportData() {
    const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
        const folderUri = permissions.directoryUri;
        try {
            const fileUri = await StorageAccessFramework.createFileAsync(
                folderUri,
                'longurance-data',
                'application/json'
            );
            const json = getExportData();
            await StorageAccessFramework.writeAsStringAsync(
                fileUri,
                JSON.stringify(json)
            );
            Alert.alert(
                'Success',
                `Exported ${json.entries.length} entries and ${json.trophies.length} trophies.`
            );
        } catch (e) {
            Alert.alert('Error', 'Export failed.');
        }
    }
}

function ImportExport() {
    return (
        <Panel>
            <SecondaryHeader style={utils.marginBottomL}>
                Import/Export
            </SecondaryHeader>
            <PrimaryText color="secondary" style={utils.marginBottomL}>
                Import or export your entries and custom trophies in JSON
                format.
            </PrimaryText>
            <Button onPress={importData}>Import</Button>
            <Separator />
            <Button onPress={exportData}>Export</Button>
        </Panel>
    );
}

export default ImportExport;
