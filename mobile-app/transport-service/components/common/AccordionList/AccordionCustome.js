import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Animated} from "react-native";

const propTypes = {
  renderView: PropTypes.func.isRequired,
  renderCollapseView: PropTypes.func.isRequired,
  collapse: PropTypes.bool,
  tension: PropTypes.number,
}
const defaultProps = {
  collapse: false,
  tension: 10
};

class AccordionCustome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: this.props.collapse,
      animation: new Animated.Value(0),
      item:this.props.item,
      apis:this.props.apis,
    };
  }

  collapse = () => {
    const { startpoint, endpoint, animation, collapse } = this.state;
    let startAnim = collapse? endpoint + startpoint : startpoint;
    let endAnim = collapse? startpoint : startpoint + endpoint;
    this.setState({
      collapse: !this.state.collapse
    })
    
    animation.setValue(startAnim);
    Animated.spring(
      this.state.animation,
      {
        toValue: endAnim,
        tension: this.props.tension,
      }
    ).start(false);
  }

  startpoint = (layout) => {
    if(!this.state.collapse) this.setState({animation: new Animated.Value(layout.nativeEvent.layout.height)});
    this.setState({
      startpoint: layout.nativeEvent.layout.height
    })
  }

  endpoint = (layout) => {
    if(this.state.collapse) this.setState({animation: new Animated.Value(layout.nativeEvent.layout.height)});
    this.setState({
      endpoint: layout.nativeEvent.layout.height,
    })
  }

  render() {
    const { startpoint, endpoint, animation, collapse } = this.state;
    return (
      <Animated.View style={{height: this.state.animation, backgroundColor:'transparent', overflow: 'hidden'}}>
       
        <View activeOpacity={1}  onLayout={this.startpoint}>
          {this.props.renderView(this.state.collapse, this.state.item, this.collapse, this.state.apis, this.props)}
        </View>
       
        <View onLayout={this.endpoint}>
          {this.props.renderCollapseView(this.state.collapse, this.state.item, this.collapse)}
        </View>
      </Animated.View>
    );
  }
}

AccordionCustome.propTypes = propTypes;
AccordionCustome.defaultProps = defaultProps;
export default AccordionCustome;