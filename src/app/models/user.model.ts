import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class User {

    constructor(
        public name: string, 
        public email: string,
        public password?: string, 
        public google?: boolean,
        public img?: string, 
        public role?: string, 
        public uid?: string, 
        ){}

    get imageUrl() {
        if( this.img?.includes('http'))
            return this.img;
            
        return this.img ? `${base_url}/upload/users/${this.img}` : `${base_url}/upload/users/no-image`;
    }

    }