import React, { Component } from 'react';





export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentrecord: [],
            currentPage: 1,
            recordsPerPage: '',
            pageNumbersPerPage: 5,
            term: '',
            year: '',
            district: '',
            classSize: '',
            schoolName: '',
            schoolYear: '',
            districtName: '',
            demo: ''


        }
        this.handleClick = this.handleClick.bind(this);
        this.handlePages = this.handlePages.bind(this);
        this.handlePagesLess = this.handlePagesLess.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.searchYearHandler = this.searchYearHandler.bind(this);
        this.searchDistrictHandler = this.searchDistrictHandler.bind(this);
        this.searchClassSizeandler = this.searchClassSizeandler.bind(this);
        this.sortByClassSize = this.sortByClassSize.bind(this);
        this.sortBySchool = this.sortBySchool.bind(this);
        this.sortBySchoolYear = this.sortBySchoolYear.bind(this);
        this.sortByDistrict = this.sortByDistrict.bind(this);
        this.sortByDemographic = this.sortByDemographic.bind(this);



    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)

        });
    }
    handlePages() {
        let currentpages = this.state.pageNumbersPerPage
        this.setState({
            pageNumbersPerPage: currentpages - 2

        })
    }
    handlePagesLess() {
        let currentpages = this.state.pageNumbersPerPage
        this.setState({
            pageNumbersPerPage: currentpages + 2

        })
    }

    componentDidMount() {
        fetch('https://data.delaware.gov/resource/ncv7-2w22.json')
            .then(result => {
                return result.json();
            })
            .then(json => {

                this.setState({
                    isLoaded: true,
                    studentrecord: json,
                    recordsPerPage: 30
                })
            })
    }

    searchHandler(e) {


        this.setState({
            term: e.target.value,
        })

    }
    searchYearHandler(e) {

        this.setState({
            year: e.target.value,

        })

    }
    searchDistrictHandler(e) {
        this.setState({
            district: e.target.value,

        })

    }
    searchClassSizeandler(e) {
        this.setState({
            classSize: e.target.value,
        })
    }


    sortByClassSize() {
        this.setState({
            classSize: 'classSize',
            demo: '',
            districtName: '',
            schoolYear: '',
            schoolName: ''
        })
    }
    sortBySchool() {
        this.setState({
            schoolName: 'schoolName',
            demo: '',
            schoolYear: '',
            districtName: '',
            classSize: ''
        })
    }
    sortBySchoolYear() {
        this.setState({
            schoolYear: 'schoolYear',
            demo: '',
            schoolName: '',
            districtName: '',
            classSize: ''

        })
    }
    sortByDistrict() {
        this.setState({
            districtName: 'districtName',
            demo: '',
            schoolName: '',
            classSize: '',
            schoolYear: ''


        })
    }
    sortByDemographic() {
        this.setState({
            demo: 'demo',
            districtName: '',
            schoolName: '',
            classSize: '',
            schoolYear: ''
        })
    }

    render() {


        var { studentrecord, currentPage, recordsPerPage } = this.state;
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentrecords = studentrecord.slice(indexOfFirstRecord, indexOfLastRecord);

        const stylea = {
            padding: 8,
            cursor: 'pointer'
        }
        const stylepagination = {
            padding: 15,

        }
        const styleHead = {


            color: 'blue',
            padding: 10,
            fontWeight: 'bold'
        }
        const styleCOl = {

            wordWrap: "break-word",
        }



        let data = [];
        if (this.state.term != '') {
            data = <div>{studentrecord.filter(student =>
                student.schoolname === this.state.term || student.schoolname.toLowerCase().
                    includes(this.state.term)).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                        <div key={index}><div className="col-md-2" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3" >{student.districtname}</div>
                            <div className="col-md-3" >{student.demographic}</div>
                            <div className="col-md-1">{student.classsize}</div></div>
                    )
            }</div>


        }
        else if (this.state.year != '') {
            data = <div >{studentrecord.filter(student =>
                student.schoolyear === this.state.year || student.schoolyear.
                    includes(this.state.year)).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                        <div key={index}><div className="col-md-2" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3" >{student.districtname}</div>
                            <div className="col-md-3">{student.demographic}</div>
                            <div className="col-md-1" >{student.classsize}</div></div>
                    )
            }</div>



        }
        else if (this.state.district !== '') {
            data = <div >{studentrecord.filter(student =>
                student.districtname === this.state.district || student.districtname.toLowerCase().
                    includes(this.state.district)).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                        <div key={index}><div className="col-md-2" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                            <div className="col-md-3" >{student.demographic}</div>
                            <div className="col-md-1" >{student.classsize}</div></div>
                    )
            }</div>


        }

        else if (this.state.classSize !== '') {
            data = <div >{studentrecord.filter(student => student.classsize != null).sort((a, b) =>
                a.classsize - b.classsize).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-2"  >{student.schoolname}</div>
                        <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3" >{student.districtname}</div>
                        <div className="col-md-3" >{student.demographic}</div>
                        <div className="col-md-1" >{student.classsize}</div></div>
                )
            }</div>


        }
        else if (this.state.schoolName !== '') {
            data = <div >{studentrecord.filter(student => student["schoolname"] != null).sort((a, b) => {
                if (a["schoolname"] < b.schoolname) { return -1; }
                if (a.schoolname > b.schoolname) { return 1; }
                return 0;

            }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                <div key={index}><div className="col-md-2" >{student.schoolname}</div>
                    <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                    <div className="col-md-3" >{student.demographic}</div>
                    <div className="col-md-1">{student.classsize}</div></div>
            )
            }</div>


        }
        else if (this.state.schoolYear !== '') {
            data = <div >{studentrecord.filter(student => student.schoolyear != null).sort((a, b) =>
                a.schoolyear - b.schoolyear).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                    <div key={index}><div className="col-md-2">{student.schoolname}</div>
                        <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                        <div className="col-md-3">{student.demographic}</div>
                        <div className="col-md-1">{student.classsize}</div></div>
                )
            }</div>


        }
        else if (this.state.districtName !== '') {
            data = <div >{studentrecord.filter(student => student.districtname != null).sort((a, b) => {
                if (a.districtname < b.districtname) { return -1; }
                if (a.districtname > b.districtname) { return 1; }
                return 0;

            }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                <div key={index}><div className="col-md-2">{student.schoolname}</div>
                    <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                    <div className="col-md-3">{student.demographic}</div>
                    <div className="col-md-1">{student.classsize}</div></div>
            )
            }</div>


        }
        else if (this.state.demo !== '') {
            data = <div >{studentrecord.filter(student => student.demographic != null).sort((a, b) => {
                if (a.demographic < b.demographic) { return -1; }
                if (a.demographic > b.demographic) { return 1; }
                return 0;

            }).slice((currentPage * 30 - 30), (currentPage * 30)).map((student, index) =>
                <div key={index}><div className="col-md-2">{student.schoolname}</div>
                    <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3">{student.districtname}</div>
                    <div className="col-md-3">{student.demographic}</div>
                    <div className="col-md-1">{student.classsize}</div></div>
            )
            }</div>


        }

        else {
            data = <div >{currentrecords.map((student, index) =>
                <div key={index}><div className="col-md-2"  >{student.schoolname}</div>
                    <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3" >{student.districtname}</div>
                    <div className="col-md-3" >{student.demographic}</div>
                    <div className="col-md-1" >{student.classsize}</div></div>
            )
            }</div>
        }



        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(studentrecord.length / recordsPerPage); i++) {
            pageNumbers.push(i);
        }
        const nmub = [];
        for (let i = 1; i <= Math.ceil(pageNumbers.length / this.state.pageNumbersPerPage); i++) {
            nmub.push(i);
        }

        const renderPageNumbers = nmub.map(number => {
            return (
                <a style={stylea}
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </a>
            );
        });


        return (
            <div>
                <div className="col-md-12">
                    <form >
                        <label htmlFor="filter">Filter by School: </label>
                        <input type="text" id="filter"
                            onChange={this.searchHandler}
                            value={this.state.term}


                        />&nbsp;
                         <label htmlFor="filter">School Year: </label>
                        <input type="text"
                            onChange={this.searchYearHandler}
                            value={this.state.year}

                        />&nbsp;
                          <label htmlFor="filter">District: </label>
                        <input type="text"
                            onChange={this.searchDistrictHandler}
                            value={this.state.district}

                        />&nbsp;

                    </form>
                    <div>

                    </div>
                </div><br />
                <br /><br /><br />
                <div style={styleHead} className="row">
                    <div className="col-md-2" style={styleHead} >&nbsp;&nbsp;<a onClick={this.sortBySchool} style={stylea}>School Name</a></div>
                    <div className="col-md-1" style={styleHead}><a onClick={this.sortBySchoolYear} style={stylea}>School Year</a></div>
                    <div className="col-md-3" style={styleHead}><a onClick={this.sortByDistrict} style={stylea}>District</a></div>
                    <div className="col-md-3" style={styleHead}><a onClick={this.sortByDemographic} style={stylea}>Demographic</a></div>
                    <div className="col-md-1" style={styleHead}><a onClick={this.sortByClassSize} style={stylea}>class Size</a></div>
                </div>




                {data}

                <div style={stylepagination}>
                    <a style={stylea} onClick={this.handlePagesLess}>&laquo;</a>
                    {renderPageNumbers}
                    <a style={stylea} onClick={this.handlePages} >&raquo;</a>
                </div></div>
        );
    }
}


export default App;