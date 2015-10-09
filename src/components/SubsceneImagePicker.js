import React, { Component } from 'react';

import SceneImages from '../scene-images';
import styles from './SubsceneImagePicker.css';

export default class SubsceneImagePicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      picking: false
    };

    this.openPicker = this.openPicker.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }

  openPicker() {
    this.setState({picking: true});
  };

  pickImage(imageIndex) {
    const { changeSceneSubsceneImage } = this.props;
    this.setState({picking: false});
    changeSceneSubsceneImage(imageIndex);
  }

  render() {

    const { subsceneImage } = this.props;
    const { picking } = this.state;

    const makeImageOption = (imagePath, i) => {
      return <img
            key={i}
            onClick={this.pickImage.bind(this, i)}
            className={styles.imageOption}
            src={imagePath}
          />;
    };

    return (
      <div className={styles.root}>

        { subsceneImage !== null && !picking &&
          <img
            className={styles.picked}
            onClick={this.openPicker}
            src={SceneImages[subsceneImage]}
          />
        }
        { subsceneImage == null && !picking &&
          <div
            className={styles.unpicked}
            onClick={this.openPicker}
          >
            <p>Pick an image</p>
          </div>
        }

        { picking &&
          <div className={styles.picker}>
            { SceneImages.map(makeImageOption) }
          </div>
        }
      </div>
    );
  }

}
