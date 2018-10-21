import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../../AC/profileActions'
import Spinner from '../../common/SpinnerLoading'
import ProfileItem from '../ProfileItem'
import Scroll from '../../common/Scroll'



export class Profiles extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.getProfiles()
  }

  render() {

    const { profiles, isLoading } = this.props.profile
    let profileItems

    if (profiles === null || isLoading) profileItems = <Spinner />
    else {
      profileItems = (profiles.length > 0)
      ? profiles.map(item => (
        <ProfileItem profile={item} key={item._id}/>
      ))
      : <h2>There's no profiles</h2>
    }
    

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4 text-center">Gamers profiles</h2>
              <p className="lead text-center">Find friends and become PRO</p>
              <Scroll>
                { profileItems }
              </Scroll>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
})



export default connect(mapStateToProps, { getProfiles } )(Profiles)
