// @flow
import React from "react";
import { CentralMenuSearchField } from "./Components";
import {
  Content,
  Header,
  Wrapper,
  FlexWrapper,
  FlexContainer
} from "./Components";
import MenuRow, { MenuHeader } from "./Table.js";
import Card from "~/components/common/Card";
import Title from "~/components/common/Title";
import Button from "~/components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import ModalContent from "./ModalContent";
import ViewMenuModal from "./ViewMenuModal";
import type { RSAA } from "~/actions/types";
import { loadCentralMenus } from "~/actions/centralMenus";
import type { CentralMenu } from "~/types/centralMenu";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { ContentLoading } from "~/components/common/Table";
import { ModalCustomStyles } from "./Components";

type Props = {
  loadCentralMenus: () => RSAA,
  isFetching: boolean,
  centralMenus: Array<CentralMenu>,
  t: string => string
};

type State = {
  showModal: boolean
};

class CentralMenus extends React.Component<Props, State> {
  state = {
    showModal: false,
    openViewMenu: false,
    viewMenuId: null,
    items: null
  };
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
    localStorage.removeItem("allDishes");
  };
  handleOnChange = () => {
    var updatedList = this.props.centralMenus;
    updatedList = updatedList.filter(function(item) {
      return (
        (item.Description &&
          item.Description.toLowerCase().search(
            event.target.value.toLowerCase()
          ) !== -1) ||
        (item.id &&
          item.id.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
      );
    });
    this.setState({ items: updatedList });
  };

  handleViewMenu = menuId => {
    this.setState({ openViewMenu: true, viewMenuId: menuId });
  };

  handleCloseViewMenu = menuId => {
    this.setState({ openViewMenu: false });
  };

  componentDidMount() {
    this.props.loadCentralMenus();
    localStorage.removeItem("allDishes");
  }

  reloadMenus = () => {
    this.props.loadCentralMenus();
  };

  render() {
    const { isFetching, centralMenus } = this.props;
    const { items } = this.state;
    return (
      <Content>
        <Header>
          <Title> Central Menu</Title>
        </Header>
        <Wrapper>
          <Card>
            <CentralMenuSearchField
              type={"text"}
              placeholder={"Search Menu"}
              onChange={this.handleOnChange}
            />
            <Button onClick={this.handleOpenModal} style={{ float: "right" }}>
              <FontAwesomeIcon icon={faPlus} style={{ marginLeft: ".25em" }} />
              {"Create New Menu"}
            </Button>
            <Wrapper>
              <MenuHeader />
              {isFetching && <ContentLoading cells={4} />}
              <MenuRow
                reloadMenus={this.reloadMenus}
                viewMenu={this.handleViewMenu}
                centralMenus={items || centralMenus}
              />
              <Modal
                style={ModalCustomStyles}
                isOpen={this.state.showModal}
                contentLabel="Detailed View"
                ariaHideApp={false}
              >
                <FlexWrapper>
                  <FlexContainer>
                    <Title style={{ paddingLeft: "4em" }}>
                      {"Create New Menu"}
                    </Title>
                  </FlexContainer>
                  <Button onClick={this.handleCloseModal}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ marginLeft: ".25em" }}
                    />
                    {"Close"}
                  </Button>
                </FlexWrapper>
                <ModalContent />
              </Modal>
              <Modal
                style={ModalCustomStyles}
                isOpen={this.state.openViewMenu}
                contentLabel="Detailed View"
                ariaHideApp={false}
              >
                <FlexWrapper>
                  <FlexContainer>
                    <Title style={{ paddingLeft: "4em" }}>
                      {"View/Update Central Menu"}
                    </Title>
                  </FlexContainer>
                  <Button onClick={this.handleCloseViewMenu}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ marginLeft: ".25em" }}
                    />
                    {"Close"}
                  </Button>
                </FlexWrapper>
                <ViewMenuModal menuId={this.state.viewMenuId} />
              </Modal>
            </Wrapper>
          </Card>
        </Wrapper>
      </Content>
    );
  }
}

//export default CentralMenus

const mapStateToProps = state => ({
  centralMenus: state.centralMenus.available,
  isFetching: state.centralMenus.isFetching
});

const mapDispatchToProps = {
  loadCentralMenus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(CentralMenus));
