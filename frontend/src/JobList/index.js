import React, { Component } from 'react';
import JoblyApi from '../JoblyApi';
import Job from '../Job';
import Search from '../Search';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [], loading: false, search: '' };
    this.generateJobs = this.generateJobs.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    if (!this.state.jobs.length) this.generateJobs();
  }

  async getJobs() {
    try {
      const encoded = encodeURIComponent(this.state.search);
      console.log('ENCODED', encoded);
      const jobs = await JoblyApi.getJobs(encoded);
      this.setState({ jobs });
    } catch (error) {
      console.log(error);
    }
  }

  generateJobs() {
    this.setState({ loading: true, jobs: [] }, this.getJobs);
  }

  handleSearch(term) {
    this.setState({ search: term }, this.getJobs);
  }

  render() {
    return (
      <React.Fragment>
        <Search search={this.handleSearch} />
        <div className="JobList">
          {this.state.jobs.map(job => (
            <Job detail={job} key={job.id} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default JobList;