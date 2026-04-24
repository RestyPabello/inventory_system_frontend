import { defineStore } from 'pinia';
import { scanItemImage, scanItemBarcode  } from '@/services/itemService';
import type { ScannedItemRequest } from '@/types/frontend/FrontendItem';

export const useItemStore = defineStore('item', {
    state: () => ({
        isScanning: false,
        lastScannedResult: null as ScannedItemRequest | null,
    }),
    
    actions: {
        async scanProduct(file: File) {
            this.isScanning = true;
            try {
                const result = await scanItemImage(file);
                this.lastScannedResult = result;
                return result;
            } catch (error) {
                console.error("Store Scan Error:", error);
                throw error;
            } finally {
                this.isScanning = false;
            }
        }, 

        async scanBarcode(barcode: string) {
            try {
                const result = await scanItemBarcode(barcode);
                return result;
            } catch (error) {
                console.error("Store Barcode Error:", error);
                throw error;
            }
        }
    }
});