class HashMap {
    constructor() {
        this.buckets = new Array(16);
    }

    hash(key) {
        if(key !== null && key !== undefined){
            let hashCode = 0;

            const primeNumber = 31;
            for(let i = 0; i < key.length; i++){
                hashCode += primeNumber * hashCode + key.charCodeAt(i); 
            }
            return hashCode;
        }
    }
    grow() {
        const length = this.lengthFunc();
        const bucketsLength = this.buckets.length;
        const lengthByLoadFactor = bucketsLength * 0.75;

        if(length >= lengthByLoadFactor){
            let newBuckets = new Array(bucketsLength * 2);
            for(let i = 0; i < bucketsLength; i++){
                const key = this.buckets.key;
                const value = this.buckets.value;
                const hashCode = this.hash(key);
                
                let index = hashCode % (newBuckets.length);
                if (index < 0 || index >= newBuckets.length) {
                   throw new Error("Trying to access index out of bound");
                } else {
                    newBuckets[index] = {key, value};
                }
                
            }
            this.buckets = newBuckets;
        }
    }

    set(key, value) {
        let bucketsLength = this.buckets.length;
        let index = this.hash(key) % bucketsLength;
        
        if (index < 0 || index >= bucketsLength) {
            throw new Error("Trying to access index out of bound");
        } else if(this.has(key)) {
            this.buckets[index].value = value;
        } else {
            this.buckets[index] = {key, value};
            this.grow;
        }
    }

    get(key) {
        let index = this.hash(key) % this.buckets.length;
        if(!this.has(key)){
            return null;
        } else if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        } else {
            return this.buckets[index].value;
        }
    }
    has(key) {
        for(let i = 0; i < this.buckets.length; i++){
            if (this.buckets[i] && this.buckets[i].key === key ){
                return true;
            } 
        }
        return false;
    }

    remove(key) {
        if(!this.has(key)) {
            return false;
        } else {
            let newBuckets = new Array(this.buckets.length);
            for(let i = 0;i < this.buckets.length; i++){
                if(this.buckets.key !== undefined && this.buckets[i].key !== key){
                    newBuckets[i] = this.buckets[i];
                }
            } 
            this.buckets = newBuckets;
            return true;
        }
    }
    lengthFunc() {
        let length = 0;
        for(let i = 0; i < this.buckets.length - 1; i++){
            if(this.buckets[i] && this.buckets[i].key !== undefined){
                length++;
            }
        }
        return length;
    }
    clear() {
        this.buckets = new Array(this.buckets.length);
    }
    keys() {
        let arrayOfKeys = [];
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i].key !== undefined){
                arrayOfKeys.push(this.buckets[i].key);
            }
        }
        return arrayOfKeys;
    }
    values() {
        let arrayOfValues = [];
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i] && this.buckets[i].value !== undefined){
                arrayOfValues.push(this.buckets[i].value);
            }
        }
        return arrayOfValues;
    }
    entries() {
        let entriesArray = [];
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i] !== undefined){
                let array = [this.buckets[i].key, this.buckets[i].value];
                entriesArray.push(array);
            }
        }
        return entriesArray;
    }

}

module.exports = {HashMap};
