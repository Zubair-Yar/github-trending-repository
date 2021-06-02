import React, { Component } from 'react';
import {Card, Figure} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './pagination.css'


export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for handling padination
            currentPage: 1,
            // for storing api data
            data: [],
            
        }

    }

    componentDidMount () {
        this.getData();
    }

    // the below function gets the data from api
    getData = async () => {
        // the currentPage state property has number
        // and the axios get the data from the same page of api
        let result = await axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${this.state.currentPage}`);
        this.setState({data: result.data.items})
    }


    handlePageClick = (e) => {
        // when user click next or previous in pagination
        // so the e.selected get ++ or --
        const selectedPage = e.selected;

        // sets to state to handle api pages 
        this.setState({
            currentPage: selectedPage,
        }, () => {
            // to get data from new page of api 
            this.getData()
        });

    };



    cardGenerator = () => {
        // it generate one card per record
        return this.state.data.map((record, i) => {
            return(
                <div key={i}>
                    {/* CARD */}
                    <Card style={{ display: 'flex', flexDirection: 'row', marginLeft: 10+"px"}}>
                        {/* IMAGE */}
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src={record.owner.avatar_url}
                                
                            />
                            </Figure>
                            <Card.Body style={{alignSelf: 'start'}}>
                                {/* Repository Name */}
                                <Card.Title style={{textAlign: 'left'}} > {record.name} </Card.Title>
                                {/* Repository Description */}
                                <Card.Text style={{textAlign: 'left'}}> {record.description} </Card.Text>
                                
                                <div style={{display: 'flex'}} >
                                    {/* Stars */}
                                    <small className="text-muted" style={{marginRight: 15+'px', border: 1+'px'+' solid' + ' black'}} > Stars {record.stargazers_count}</small>
                                    {/* Issues */}
                                    <small className="text-muted" style={{marginRight: 15+'px', border: 1+'px'+' solid' + ' black'}} > Issues {record.open_issues_count}</small>
                                    {/* Time and Author */}
                                    <small className="text-muted" style={{marginRight: 15+'px'}} >Submmited {record.created_at}  by  {record.owner.login}</small>
                                </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        })
    }



    render() {
        return (
            // The pagination 
            <div>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={""}
                    breakClassName={"break-me"}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={0}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    initialPage={1}
                    activeClassName={"active"}/>

                {/* the below function generate the cards  */}
                {/* based on api data  */}
                {this.cardGenerator()}
            </div>
        )
    }
}
