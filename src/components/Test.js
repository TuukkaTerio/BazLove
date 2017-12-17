import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Svg } from 'expo';

export default class SvgCircleAnimation extends Component {
    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get('window');
        this.r = new Animated.Value(randomNumber(50, width / 2));
        this.cx = new Animated.Value(randomNumber(50, width));
        this.cy = new Animated.Value(randomNumber(50, height));
    }

    componentDidMount() {
        this.animate();
    }

    animate = () => {
        const { width, height } = Dimensions.get('window');
        Animated.parallel([
            Animated.spring(this.r, {
                toValue: randomNumber(50, width / 2)
            }),
            Animated.spring(this.cx, {
                toValue: randomNumber(50, width)
            }),
            Animated.spring(this.cy, {
                toValue: randomNumber(50, height)
            })
        ]).start(() => this.animate());
    };

    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={{ marginTop: 40 }}>
                <Svg width={width} height={height}>
                    <Circle
                        stroke={randomColor()}
                        fill={randomColor()}
                        r={this.r}
                        cx={this.cx}
                        cy={this.cy}
                    />
                </Svg>
            </View>
        );
    }
}
