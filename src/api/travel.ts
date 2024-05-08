import axios from "axios";
import {Search} from "@/models/Search";
import {OptionalTrip} from "@/models/OptionalTrip";
import {PageTrip} from "@/models/PageTrip";
import {TripArticle} from "@/models/PageArticle";
import {fromObject as fromObjectToErrors} from "@/helper/parser/error";
import {fromObject as fromObjectToCountServices} from "@/helper/countService";
import {Hotel} from "@/models/Hotel";
import type {SearchInput} from "@/models/SearchInput";
import {Flight} from "@/models/Flight";
import {Weather} from "@/models/Weather";
import {LastMinuteInput} from "@/models/LastMinuteInput";
import {LastMinute} from "@/models/LastMinute";
import type {TripInput} from "@/models/TripInput";

class travel {
    static search = async (input: SearchInput): Promise<Search> => axios
        .post(`${import.meta.env.VITE_API_URL}/search`, input.toPayload(), {headers: {Accept: 'application/json'}})
        .then((response) => new Search(
            response.data.id,
            response.data.nation,
            response.data.place,
            response.data.from,
            response.data.to,
            response.data.adults,
            response.data.children,
            response.data.fromAirport,
            response.data.toAirport,
            response.data.services,
            fromObjectToErrors(response.data.errors),
            response.data.createdAt,
            response.data.updatedAt,
            response.data.finished,
            fromObjectToCountServices(response.data.countServices),
        ));

    static lastMinute = async (input: LastMinuteInput): Promise<LastMinute> => axios
        .post(`${import.meta.env.VITE_API_URL}/last-minute`, input.toPayload(), {headers: {Accept: 'application/json'}})
        .then((response) => new LastMinute(
            response.data.id,
            response.data.from,
            response.data.to,
            response.data.adults,
            response.data.children,
            response.data.fromAirport,
            response.data.services,
            fromObjectToErrors(response.data.errors),
            response.data.createdAt,
            response.data.updatedAt,
            response.data.finished,
            fromObjectToCountServices(response.data.countServices),
        ));

    static getSearch = async (id: number): Promise<Search> => axios
        .get(`${import.meta.env.VITE_API_URL}/search/${id}`, {headers: {Accept: 'application/json'}})
        .then((response) => new Search(
            response.data.id,
            response.data.nation,
            response.data.place,
            response.data.from,
            response.data.to,
            response.data.adults,
            response.data.children,
            response.data.fromAirport,
            response.data.toAirport,
            response.data.services,
            fromObjectToErrors(response.data.errors),
            response.data.createdAt,
            response.data.updatedAt,
            response.data.finished,
            fromObjectToCountServices(response.data.countServices),
        ));

    static getLastMinute = async (id: number): Promise<LastMinute> => axios
        .get(`${import.meta.env.VITE_API_URL}/last-minute/${id}`, {headers: {Accept: 'application/json'}})
        .then((response) => new LastMinute(
            response.data.id,
            response.data.from,
            response.data.to,
            response.data.adults,
            response.data.children,
            response.data.fromAirport,
            response.data.services,
            fromObjectToErrors(response.data.errors),
            response.data.createdAt,
            response.data.updatedAt,
            response.data.finished,
            fromObjectToCountServices(response.data.countServices),
        ));

    static getSearches = async (): Promise<Search[]> => axios
        .get(`${import.meta.env.VITE_API_URL}/search`, {headers: {Accept: 'application/json'}})
        .then((response) => response.data.map((data: any) => new Search(
            data.id,
            data.nation,
            data.place,
            data.from,
            data.to,
            data.adults,
            data.children,
            data.fromAirport,
            data.toAirport,
            data.services,
            fromObjectToErrors(data.errors),
            data.createdAt,
            data.updatedAt,
            data.finished,
            fromObjectToCountServices(data.countServices),
        )));

    static getLastMinutes = async (): Promise<LastMinute[]> => axios
        .get(`${import.meta.env.VITE_API_URL}/last-minute`, {headers: {Accept: 'application/json'}})
        .then((response) => response.data.map((data: any) => new LastMinute(
            data.id,
            data.from,
            data.to,
            data.adults,
            data.children,
            data.fromAirport,
            data.services,
            fromObjectToErrors(data.errors),
            data.createdAt,
            data.updatedAt,
            data.finished,
            fromObjectToCountServices(data.countServices),
        )));

    static getOptionalTrips = async (searchId: number, source: string): Promise<OptionalTrip[]> => axios
        .get(`${import.meta.env.VITE_API_URL}/optional_trips`, {
            params: {search: searchId, source: source},
            headers: {Accept: 'application/json'}
        })
        .then((response) => response.data.map((data: any) => new OptionalTrip(
            data.id,
            data.title,
            data.description,
            data.url,
            data.image,
            data.source,
            data.price,
            data.priceForOnePerson,
            data.currency
        )));

    static getPageTrips = async (searchId: number, source: string): Promise<PageTrip[]> => axios
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

    static getHotels = async (searchId: number, source: string): Promise<Hotel[]> => axios
        .get(`${import.meta.env.VITE_API_URL}/hotels`, {
            params: {search: searchId, source: source},
            headers: {Accept: 'application/json'}
        })
        .then((response) => response.data.map((data: any) => new Hotel(
            data.id,
            data.title,
            data.url,
            data.address,
            data.descriptions,
            data.image,
            data.stars,
            data.rate,
            data.food,
            data.from,
            data.to,
            data.price,
            data.priceForOnePerson,
            data.currency,
            data.source,
        )));

    static getFlights = async (searchId: number, source: string): Promise<Flight[]> => axios
        .get(`${import.meta.env.VITE_API_URL}/flights`, {
            params: {search: searchId, source: source},
            headers: {Accept: 'application/json'}
        })
        .then((response) => response.data.map((data: any) => new Flight(
            data.id,
            data.fromAirport,
            data.fromStart,
            data.fromEnd,
            data.fromStops,
            data.toAirport,
            data.toStart,
            data.toEnd,
            data.toStops,
            data.url,
            data.price,
            data.priceForOnePerson,
            data.currency,
            data.source,
        )));

    static getWeathers = async (searchId: number, source: string): Promise<Weather[]> => axios
        .get(`${import.meta.env.VITE_API_URL}/weather`, {
            params: {search: searchId, source: source, limit: 10},
            headers: {Accept: 'application/json'}
        })
        .then((response) => response.data.map((data: any) => new Weather(
            data.id,
            data.city.namePl,
            data.date,
            data.temperature2mMean,
            data.precipitationHours,
            data.precipitationSum,
            data.source,
        )));

    static getTrips = async (tripInput: TripInput): Promise<Hotel[]> => axios
        .get(`${import.meta.env.VITE_API_URL}/trips`, {
            params: tripInput.toPayload(),
            headers: {Accept: 'application/json'}
        })
        .then((response) => response.data.map((data: any) => new Hotel(
            data.id,
            data.title,
            data.url,
            null,
            [],
            data.image,
            data.stars,
            data.rate,
            data.food,
            data.from,
            data.to,
            data.price,
            data.priceForOnePerson,
            data.currency,
            data.source,
        )));
}

export default travel
