import axios from "axios";
import {Search} from "@/models/Search";
import {OptionalTrip} from "@/models/OptionalTrip";
import {PageTrip} from "@/models/PageTrip";
import {TripArticle} from "@/models/PageArticle";
import {Money} from "@/models/Money";
import {fromObject as fromObjectToErrors} from "@/parser/error";
import {fromObject as fromObjectToCountServices} from "@/parser/countService";

class travel {
    static async search(nation: string, place: string, force: boolean = false): Promise<Search> {
        return axios
            .post(`${import.meta.env.VITE_API_URL}/search`, {
                "nation": nation,
                "place": place,
                "force": force
            }, {headers: {Accept: 'application/json'}})
            .then((response) => new Search(
                response.data.id,
                response.data.nation,
                response.data.place,
                response.data.services,
                fromObjectToErrors(response.data.errors),
                response.data.createdAt,
                response.data.updatedAt,
                response.data.finished,
                fromObjectToCountServices(response.data.countServices),
            ));
    }

    static async get(id: number): Promise<Search> {
        return axios
            .get(`${import.meta.env.VITE_API_URL}/search/${id}`, {headers: {Accept: 'application/json'}})
            .then((response) => new Search(
                response.data.id,
                response.data.nation,
                response.data.place,
                response.data.services,
                fromObjectToErrors(response.data.errors),
                response.data.createdAt,
                response.data.updatedAt,
                response.data.finished,
                fromObjectToCountServices(response.data.countServices),
            ));
    }

    static async getSearches(): Promise<Search[]> {
        return axios
            .get(`${import.meta.env.VITE_API_URL}/search`, {
                headers: {Accept: 'application/json'}
            })
            .then((response) => response.data.map((data: any) => new Search(
                data.id,
                data.nation,
                data.place,
                data.services,
                fromObjectToErrors(data.errors),
                data.createdAt,
                data.updatedAt,
                data.finished,
                fromObjectToCountServices(data.countServices),
            )));
    }

    static async getOptionalTrips(searchId: number, source: string): Promise<OptionalTrip[]> {
        return axios
            .get(`${import.meta.env.VITE_API_URL}/optional_trips`, {
                params: {search: searchId, source: source},
                headers: {Accept: 'application/json'}
            })
            .then((response) => response.data.map((data: any) => new OptionalTrip(
                data.id,
                data.title,
                data.description,
                data.url,
                data.img,
                data.source,
                data.money ? new Money(data.money.price, data.money.currency) : null,
            )));
    }

    static async getPageTrips(searchId: number, source: string): Promise<PageTrip[]> {
        return axios
            .get(`${import.meta.env.VITE_API_URL}/trip_pages`, {
                params: {search: searchId, source: source},
                headers: {Accept: 'application/json'}
            })
            .then((response) => response.data.map((data: any) => new PageTrip(
                data.id,
                data.url,
                data.map,
                data.tripArticles.map((data: any) => new TripArticle(
                    data.id,
                    data.title,
                    data.descriptions,
                    data.images,
                )),
                data.source
            )));
    }
}

export default travel
