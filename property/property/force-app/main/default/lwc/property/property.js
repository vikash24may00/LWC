


// import { LightningElement, wire, track } from 'lwc';
// import getPropertyItems from '@salesforce/apex/PropertyController.getPropertyItems';
// import searchPropertyItems from '@salesforce/apex/PropertyController.searchPropertyItems';

// export default class Property extends LightningElement {
//      propertyItems;
//      error;
//     searchTerm = '';
//     selectedFilters = {
//         Small: false,
//         Medium: false,
//         Large: false
//     };

//     @wire(getPropertyItems)
//     wiredPropertyItems({ error, data }) {
//         this.extractData(error, data);
//     }

//     handleChange(event) {
//         this.searchTerm = event.target.value;
//         this.search();
//     }

//     handleFilterChange(event) {
//         const filter = event.target.value;
//         this.clearAllFiltersExcept(filter);
//         this.selectedFilters[filter] = event.target.checked;
//         this.search();
//     }

//     clearAllFiltersExcept(selectedFilter) {
//         for (let filter in this.selectedFilters) {
//             if (filter !== selectedFilter) {
//                 this.selectedFilters[filter] = false;
//             }
//         }
//     }

//     clearFilter() {
//         this.searchTerm = '';
//         this.selectedFilters = {
//             Small: false,
//             Medium: false,
//             Large: false
//         };
//         this.search();
//     }

//     search() {
//         const filters = Object.keys(this.selectedFilters).filter(key => this.selectedFilters[key]);
//         searchPropertyItems({ searchKeywords: this.searchTerm, filters: filters })
//             .then(result => {
//                 this.extractData(undefined, result);
//             })
//             .catch(error => {
//                 this.error = error;
//                 this.propertyItems = undefined;
//             });
//     }

//     extractData(error, data) {
//         if (data) {
//             let allData = JSON.parse(JSON.stringify(data));
//             this.propertyItems = allData;
//             this.error = undefined;
//         } else if (error) {
//             this.error = error;
//             this.propertyItems = undefined;
//         }
//     }
// }


import { LightningElement, wire, track } from 'lwc';
import getPropertyItems from '@salesforce/apex/PropertyController.getPropertyItems';
import searchPropertyItems from '@salesforce/apex/PropertyController.searchPropertyItems';

export default class Property extends LightningElement {
    @track propertyItems;
    @track error;
    searchTerm = '';
    selectedFilters = {
        Small: false,
        Medium: false,
        Large: false
    };

    @wire(getPropertyItems)
    wiredPropertyItems({ error, data }) {
        this.extractData(error, data);
    }

    handleInputChange(event) {
        this.searchTerm = event.target.value;
    }

    handleFilterChange(event) {
        const filter = event.target.value;
        this.clearAllFiltersExcept(filter);
        this.selectedFilters[filter] = event.target.checked;
        this.search(); // Trigger search immediately when checkbox changes
    }

    clearAllFiltersExcept(selectedFilter) {
        for (let filter in this.selectedFilters) {
            if (filter !== selectedFilter) {
                this.selectedFilters[filter] = false;
            }
        }
    }

    clearFilter() {
        this.searchTerm = '';
        this.selectedFilters = {
            Small: false,
            Medium: false,
            Large: false
        };
        this.search();
    }

    handleSearch() {
        this.search();
    }

    search() {
        const filters = Object.keys(this.selectedFilters).filter(key => this.selectedFilters[key]);
        searchPropertyItems({ searchKeywords: this.searchTerm, filters: filters })
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
