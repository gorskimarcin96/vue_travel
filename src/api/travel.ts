import axios from "axios";
import {Search} from "@/models/Search";
import {OptionalTrip} from "@/models/OptionalTrip";
import {PageTrip} from "@/models/PageTrip";
import {TripArticle} from "@/models/PageArticle";
import {Money} from "@/models/Money";

class travel {
    static async search(nation: string, place: string, force: boolean = false): Promise<Search> {
        return axios
            .post('http://localhost/search', {
                "nation": nation,
                "place": place,
                "force": force
            }, {headers: {Accept: 'application/json'}})
            .then((response) => {
                return new Search(
                    response.data.id,
                    response.data.services,
                    response.data.errors,
                    response.data.createdAt,
                    response.data.updatedAt,
                    response.data.finished,
                );
            });
    }

    static async getOptionalTrips(searchId: number, source: string): Promise<OptionalTrip[]> {
        return axios
            .get('http://localhost/optional_trips', {
                params: {search: searchId, source: source},
                headers: {Accept: 'application/json'}
            })
            .then((response) => {
                return response.data.map((data: any) => new OptionalTrip(
                    data.id,
                    data.title,
                    data.description,
                    data.url,
                    data.img,
                    data.source,
                    data.money ? new Money(data.money.price, data.money.currency) : null,
                ));
            });
    }

    static async getPageTrips(searchId: number, source: string): Promise<PageTrip[]> {
        return axios
            .get('http://localhost/trip_pages', {
                params: {search: searchId, source: source},
                headers: {Accept: 'application/json'}
            })
            .then((response) => {
                return response.data.map((data: any) => new PageTrip(
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
                ));
            });
    }
}

export default travel
