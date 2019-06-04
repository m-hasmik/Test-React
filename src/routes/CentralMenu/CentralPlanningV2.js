// @flow
import React from "react";
import Button from "~/components/common/Button";
import Planner from "~/components/PlannerV2";

type Props = {
  menuId: string,
  isFetching: boolean,
  planning: PlanningType,
  loadPlan: string => RSAA,
  count: number
};

class CentralPlanningV2 extends React.Component<Props> {
  state = {
    centralPlan: []
  };
  constructor(props) {
    super(props);
  }

  saveCentralPlanning = () => {
    this.props.handleNext(this.state);
  };

  updateCentralPlan = centralPlan => {
      this.setState({ centralPlan });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.centralPlan) {
      this.setState({ centralPlan: nextProps.centralPlan });
    }
  }

  componentDidMount() {
    this.setState({ centralPlan: this.props.centralPlan });
  }

  render() {

      return (
      <React.Fragment>
        <div style={{ float: "right", display: "block" }}>
          <Button onClick={this.props.handlePrev}>Prev</Button>
          <Button onClick={this.saveCentralPlanning}>Save</Button>
        </div>
        <br />
        <br />
        <Planner
          updateCentralPlan={this.updateCentralPlan}
          planning={this.state.centralPlan}
          menuId={this.props.menuId}
          count={this.props.count}
        />
      </React.Fragment>
    );
  }
}

export default CentralPlanningV2;
