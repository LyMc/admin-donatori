import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Pages from '../components/Pages'

const mapStateToProps = createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
