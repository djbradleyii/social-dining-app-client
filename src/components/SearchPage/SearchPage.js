import React from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';
import ContextManager from '../../context/context-manager';
import EventsApiService from '../../services/events-api-service';
import moment from 'moment';
import ActiveUserService from '../../services/activeuser-service';

export default class SearchPage extends React.Component{
     static contextType = ContextManager;
                       
    state = {
        keyword: '',
        events: []
    }

    updateEventList = () => {
        if(this.state.keyword.length <= 1){
            EventsApiService.getAllEvents()
            .then(events => {
                this.setState({
                    events
                })
            })
        } else {
            EventsApiService.getEventByKeyword(this.state.keyword)
            .then(events => {
                this.setState({
                    events
                })
            })
        }
    }

    updateKeyword = (e) => {
        e.preventDefault();
        this.setState({
            keyword: e.target.value
        }, this.updateEventList)
    }

    renderContent(){
        let events = this.state.events;
        let populateOrganizer;
        let activeuser = ActiveUserService.getUserData();
        let user = activeuser.user;

        events = events.map((event, i) => {
            if(event.organizer === user.id){
                populateOrganizer = 'Me';
            } else {
                populateOrganizer = <Link to={`/info/${event.organizer}`}>{event.organizer_name}</Link>;
            }
            return <tr key={i}><td className="clipTitleText"><Link to={`/event/${event.id}`}>{event.title}</Link></td><td className="clipOrganizerText">{populateOrganizer}</td><td className="m-hide">{event.event_purpose}</td><td className="clipRestaurantText">{event.restaurant}</td><td>{moment(event.date).format('MM/DD/YY')}</td></tr>;
        })

        return(
            <section className="events-list">
                <table className="events-list-table">
                    <thead><tr><th>Event List:</th></tr></thead>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Organizer</th>
                            <th className="m-hide">Purpose</th>
                            <th>Restaurant</th>
                            <th>Date</th>
                        </tr>
                        {events}
                    </tbody>
                </table>
            </section>
        )
    }

    componentDidMount(){
        EventsApiService.getAllEvents()
        .then(events => {
            this.setState({
                events
            })
        })
    }

    render(){
        return(
            <ContextManager.Consumer>
                {(value) => {
                    return(
                        <div>
                            <form id="search-form" onSubmit={this.updateKeyword}>
                                <div className="search-info">Input a search term to search all events based on title, address, restaurant, event_purpose and description.</div>
                                <div>
                                    <label htmlFor="search">Search <span className="searchCaseSensitive">(Case Insensitive):</span> </label>
                                    <input type="search" id="search" placeholder="Wine &amp; Networking" value={this.state.keyword} name="keyword" onChange={this.updateKeyword}/>
                                </div>
                            </form>
                            {!!this.state.events.length && this.renderContent()}
                        </div>
                    )
                }}
            </ContextManager.Consumer>
        )
    }
}