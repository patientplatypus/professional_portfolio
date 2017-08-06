import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const AlignContainer = styled.div`
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    flex-direction:column;
`

AlignContainer.propTypes = {
  reverse: PropTypes.bool,
}

export default AlignContainer
