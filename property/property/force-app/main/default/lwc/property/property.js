import { LightningElement, wire } from 'lwc';
import getPropertyItems from '@salesforce/apex/PropertyController.getPropertyItems';
import searchPropertyItems from '@salesforce/apex/PropertyController.searchPropertyItems';
export default class Property extends LightningElement {
    propertyItems;
    error;
    searchTerm = '';
 
    @wire(getPropertyItems)
    wiredPropertyItems({ error, data }) {
        this.extractData(error, data);
    }
 
    handleChange(event) {
        this.searchTerm = event.target.value;
    }
 
    clearFilter(){
        this.searchTerm = '';
        this.search();
    }
 
    search() {
        searchPropertyItems({ searchKeywords: this.searchTerm })
            .then(result => {
                this.extractData(undefined, result);
            })
            .catch(error => {
                this.error = error;
                this.propertyItems = undefined;
            });
    }
 
    extractData(error, data) {
        if (data) {
            let allData = JSON.parse(JSON.stringify(data));
            this.propertyItems = allData;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.propertyItems = undefined;
        }
    }
}