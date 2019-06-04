//@flow
import React from 'react'
import styled from 'styled-components'
import { GRAY_MEDIUM_DARK } from '~/constants/colors'
import Button from '~/components/common/Button'
import Modal from 'react-modal'
import { FlexWrapper, FlexContainer } from './Components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { CustomLabel, ModalSmallCustomStyles } from './Components'
import { Form, Field } from 'react-final-form'
import Picky from 'react-picky'
import 'react-picky/dist/picky.css'
import { Table } from 'react-bootstrap'
import axios from 'axios'

export const inputFieldStyles = {
  width: '600px',
  height: '40px',
  margin: '0.4rem 0 1.5rem 0',
  padding: '0 1rem 0 1rem',
  flex: '1',
  display: 'block',
  fontFamily: 'Poppins,sans-serif',
  fontSize: '0.9rem',
  lineHeight: '1.5',
  color: '#575148',
  backgroundClip: 'padding-box',
  border: '1px solid #909090',
  borderRadius: '0.25rem',
  transition: 'border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out'
}

export const inputFieldSmallStyles = {
  width: '200px',
  padding: '0 1rem 0 1rem',
  marginRight: '1rem',
  borderRadius: '5px',
  border: `1px solid ${GRAY_MEDIUM_DARK}`,
  height: '40px',
  margin: '0.4rem 1rem 1.5rem 0'
}

export const CheckboxLable = styled.span`
  margin-right: 1rem;
`

export const CheckboxesContainer = styled.div`
  margin-right: 1rem;
  padding: 0.5rem 0 1.3rem 0;
`

const headerOptions = [
  'Condition Id',
  'Value',
  'Period',
  'Start',
  'End',
  'Min Quantity',
  'Max Quantity',
  ''
]

export const Content = styled.div``
type ConditionsType = {
  conditionType: string,
  recipeValues: Array<string>,
  value: string,
  conditionPeriod: string,
  startValue: string,
  endValue: string,
  maxValue: string,
  minValue: string
}

let conditionsMock = [
  // {
  //     conditionType: "",
  //     recipeValues: [""],
  //     value: "",
  //     conditionPeriod: "",
  //     startValue: "",
  //     endValue: "",
  //     maxValue: "",
  //     minValue: ""
  // }
]

const seasonList = [
  {
    id: 1,
    name: 'Spring'
  },
  {
    id: 2,
    name: 'Summer'
  },
  {
    id: 3,
    name: 'Autumn'
  },
  {
    id: 4,
    name: 'Winter'
  }
]

const conditionTypes = [
  'Recipe Condition',
  'Cost Condition',
  'Budget Condition'
]

let defaultCreateCondition = {
  conditionType: 'Recipe Condition',
  recipeValues: [],
  conditionPeriod: '',
  startValue: '',
  endValue: '',
  maxValue: '',
  minValue: '',
  value: ''
}

type Props = {
  onChange: () => void,
  handleMultiSelectChange: () => void
}

type State = {
  selectedOptions?: Array<string>,
  showModal: boolean,
  formData: Array<Object>,
  conditionsData: Array<Object>
}

export default class GenericConditions extends React.Component<Props, State> {
  state = {
    showModal: false,
    selectedOptions: [],
    formData: [],
    conditionsData: this.props.conditions,
    createCondition: defaultCreateCondition,
    conditionTypes: conditionTypes,
    seasonList: seasonList,
    weekValues: [],
    seasonValues: []
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }
  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  selectWeekMultipleOption = value => {
    this.setState({
      weekValues: value
    })
  };

  onDeleteItem = key => {
      this.state.conditionsData.splice(key, 1);
      this.setState({
          conditionsData: this.state.conditionsData
      });
  };

  selectSeasonMultipleOption = value => {
    this.setState({ seasonValues: value })
  }

  normalizerObj = (data: Object): ConditionsType => ({
    conditionType: data.conditionType,
    recipeValues: data.recipeValues,
    value: data.value,
    cost: data.cost,
    conditionPeriod: data.conditionPeriod,
    startValue: data.startValue,
    endValue: data.endValue,
    maxValue: data.maxValue,
    minValue: data.minValue
  })

  onSubmit = async (values: Array<Object>) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(300)

    switch (values.conditionPeriod) {
      case 'Week':
        this.state.weekValues.reduce(function(prev, curr) {
          values.startValue = prev.id < curr.id ? prev.name : curr.name
          values.endValue = prev.id > curr.id ? prev.name : curr.name
        })

        break
      case 'Season':
        this.state.seasonValues.reduce(function(prev, curr) {
          console.log('prev.id', prev.id)
          values.startValue = prev.id < curr.id ? prev.name : curr.name
          values.endValue = prev.id > curr.id ? prev.name : curr.name
        })
        break
    }

    this.setState({ formData: values })
    this.handleCloseModal()

    let newConditionsArr = this.normalizerObj(this.state.formData)
    axios({
      method: 'post',
      url:
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/addConditionToMenu',
      params: {
        secret: 'test'
      },
      data: {
        condition: newConditionsArr,
        id: this.props.menuId
      }
    })
      .then(response => {

        this.props.loadMenu(this.props.menuId)

        this.setState({
            conditionsData: this.state.conditionsData.concat(newConditionsArr)
        })

      })
      .catch(error => {
        return { data: error.message, error }
      })
  }

  choosePeriod = value => {
    let weekList = []
    for (let i = 1; i <= 7; i++) {
      weekList.push({ id: i, name: `Week ${i}` })
    }
    switch (value) {
      case 'Day':
        return (
          <div>
            <CustomLabel htmlFor="startEnd">{'Start/End'}</CustomLabel>
            <div>
              <Field
                name="startValue"
                component="input"
                type="number"
                placeholder="Start"
                style={inputFieldSmallStyles}
              />
              <Field
                name="endValue"
                component="input"
                type="number"
                placeholder="End"
                style={inputFieldSmallStyles}
              />
            </div>
          </div>
        )
      case 'Week':
        return (
          <div>
            <CustomLabel htmlFor="Week">{'Week'}</CustomLabel>
            <Picky
              value={this.state.weekValues}
              options={weekList}
              onChange={this.selectWeekMultipleOption}
              valueKey="id"
              labelKey="name"
              multiple={true}
              dropdownHeight={200}
              style={inputFieldStyles}
            />
          </div>
        )

      case 'Season':
        return (
          <div>
            <CustomLabel htmlFor="Season">{'Season'}</CustomLabel>
            <Picky
              value={this.state.seasonValues}
              options={this.state.seasonList}
              onChange={this.selectSeasonMultipleOption}
              valueKey="id"
              labelKey="name"
              multiple={true}
              dropdownHeight={400}
            />
          </div>
        )
    }
  }

  renderCost = values => {
    return (
      <div>
        <div>
          <label htmlFor="conditionPeriod">Cost:</label>
          <Field
            name="cost"
            style={inputFieldStyles}
            component="input"
            type="number"
          />
        </div>
        <div>
          <label htmlFor="conditionPeriod">Value:</label>
          <Field
            name="value"
            style={inputFieldStyles}
            component="input"
            type="number"
          />
        </div>
        <div>
          <label htmlFor="conditionPeriod"> Condition Period:</label>
          <Field
            name="conditionPeriod"
            style={inputFieldStyles}
            component="select"
          >
            <option />
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Cycle">Cycle</option>
            <option value="Season">Season</option>
          </Field>
        </div>
        {this.choosePeriod(values.conditionPeriod)}
      </div>
    )
  }
  renderBudget = values => {
    return (
      <div>
        <div>
          <label htmlFor="conditionPeriod">Budget :</label>
          <Field
            name="budget"
            style={inputFieldStyles}
            component="input"
            type="number"
          />
        </div>
        <div>
          <label htmlFor="conditionPeriod">Value:</label>
          <Field
            name="value"
            style={inputFieldStyles}
            component="input"
            type="number"
          />
        </div>
        <div>
          <label htmlFor="conditionPeriod"> Condition Period:</label>
          <Field
            name="conditionPeriod"
            style={inputFieldStyles}
            component="select"
          >
            <option />
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Cycle">Cycle</option>
            <option value="Season">Season</option>
          </Field>
        </div>
        {this.choosePeriod(values.conditionPeriod)}
      </div>
    )
  }

  renderRecipe = values => {
    return (
      <div>
        <CustomLabel htmlFor="minMax"> Min/Max Quantity: </CustomLabel>
        <div>
          <Field
            name="minValue"
            component="input"
            type="number"
            placeholder="Min Value"
            style={inputFieldSmallStyles}
          />
          <Field
            name="maxValue"
            component="input"
            type="number"
            placeholder="Max Value"
            style={inputFieldSmallStyles}
          />
        </div>

        <div>
          <label htmlFor="recipeValues"> {'Recipe Value:'}</label>

          <CheckboxesContainer>
            <Field
              name="recipeValues"
              component="input"
              type="checkbox"
              value="Organic"
            />
            <CheckboxLable> {'Organic'} </CheckboxLable>
            <Field
              name="recipeValues"
              component="input"
              type="checkbox"
              value="Vegan"
            />
            <CheckboxLable> {'Vegan'} </CheckboxLable>
            <Field
              name="recipeValues"
              component="input"
              type="checkbox"
              value="Allergen Free"
            />
            <CheckboxLable> {'Allergen Free'} </CheckboxLable>
            <Field
              name="recipeValues"
              component="input"
              type="checkbox"
              value="Gluten Free"
            />
            <CheckboxLable> {'Gluten Free'} </CheckboxLable>
          </CheckboxesContainer>
        </div>

        <div>
          <label htmlFor="conditionPeriod"> Condition Period:</label>
          <Field
            name="conditionPeriod"
            style={inputFieldStyles}
            component="select"
          >
            <option />
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Cycle">Cycle</option>
            <option value="Season">Season</option>
          </Field>
        </div>
        {this.choosePeriod(values.conditionPeriod)}
      </div>
    )
  }

  render() {


      const { conditionsData } = this.state;
      return (
      <div>
        <Button
          role="button"
          onClick={this.handleOpenModal}
          style={{ marginBottom: '1rem' }}
        >
          {'Create Condition '}
        </Button>

        {this.state.conditionTypes.map((type, key) => {
          if (conditionsData.find(item => item.conditionType === type)) {
            return (
              <div key={key}>
                <h4>{type}</h4>
                <Table responsive hover>
                  <thead>
                    <tr>
                      {headerOptions.map((i, idx) => (
                        <th key={`headerOptions${idx}`}>{i}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {conditionsData.map((item, idx) => {
                      if (type === item.conditionType) {
                        return (
                          <tr key={`conditionsRow${idx}`}>
                            <td> {item.recipeValues} </td>
                            <td> {item.value} </td>
                            <td> {item.conditionPeriod} </td>
                            <td> {item.startValue} </td>
                            <td> {item.endValue} </td>
                            <td> {item.maxValue} </td>
                            <td> {item.minValue} </td>
                            <td width="80">
                              <Button
                                key={idx}
                                style={{ color: 'white' }}
                                onClick={() =>
                                  window.confirm(
                                    'Are you sure you wish to delete this item?'
                                  ) && this.onDeleteItem(idx)
                                }
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />{' '}
                              </Button>
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            )
          }
        })}

        <Modal
          style={ModalSmallCustomStyles}
          isOpen={this.state.showModal}
          contentLabel="Detailed View"
          ariaHideApp={false}
        >
          <FlexWrapper>
            <FlexContainer>
              <h3> Create Conditions </h3>
            </FlexContainer>
            <Button onClick={this.handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} style={{ marginLeft: '.25em' }} />{' '}
              {'Close '}
            </Button>
          </FlexWrapper>
          <br />

          <Form
            onSubmit={this.onSubmit}
            initialValues={defaultCreateCondition}
            render={({ handleSubmit, pristine, submitting, values }) => {
              switch (values.conditionType) {
                case 'Recipe Condition':
                  values.typeRender = this.renderRecipe(values)
                  break;
                case 'Cost Condition':
                  values.typeRender = this.renderCost(values)
                  break;
                case 'Budget Condition':
                  values.typeRender = this.renderBudget(values)
                  break;
              }

              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="conditionType">Condition Type:</label>
                    <Field
                      name="conditionType"
                      style={inputFieldStyles}
                      component="select"
                    >
                      {this.state.conditionTypes.map((type, k) => (
                        <option key={k} value={type}>
                          {type}
                        </option>
                      ))}
                    </Field>
                  </div>
                  {values.typeRender}
                  <div className="buttons" style={{ textAlign: 'right' }}>
                    <Button type="submit" disabled={submitting || pristine}>
                      Submit
                    </Button>
                  </div>
                </form>
              )
            }}
          />
        </Modal>
      </div>
    )
  }
}
