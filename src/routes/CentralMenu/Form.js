//@flow
import React from 'react'
import { FlexWrapper } from './Components'
import CreateMenuForm from './CreateMenuForm'
import Conditions from './Conditions'
import axios from 'axios'
import { SERVER_URL } from '~/constants/server'

type Props = {}
type State = {
  currentStep: number,
  menuDescription: string,
  dayPart: string,
  sector: string,
  cyclePeriod: string,
  dishType: string,
  selectedOptions: Array<Object>,
  selectedOptionsArr: Array<string>,
  isMenuCreated: boolean
}

export default class Form extends React.Component<Props, State> {
  state = {
    currentStep: 1,
    menuDescription: '',
    dayPart: '',
    sector: '',
    cyclePeriod: '',
    dishType: '',
    selectedOptions: [],
    selectedOptionsArr: [],
    isMenuCreated: false,
    hasError: false,
    isValid: false
  }

  postConditionHeaders() {
    const conditionHeaderUrl = `${SERVER_URL}/sap/opu/odata/sap/ZCM_CENTRALMENU_SRV/ZC_CONDITION`
    const centralMenuUrl = `${SERVER_URL}/sap/opu/odata/sap/ZCM_CENTRALMENU_SRV/ZA_CentralMenu`
    const {
      menuDescription,
      dayPart,
      sector,
      cyclePeriod,
      selectedOptionsArr
    } = this.state
    let Rftoken = 'hKoBnIAuim4QpvdRfcdblA=='

    // axios.get(`${SERVER_URL}/sap/opu/odata/sap/ZCM_CENTRALMENU_SRV`,{
    //     headers:{"x-csrf-token":"Fetch"}
    // }
    // ).then((response)=>{
    //      Rftoken = response.headers['x-csrf-token'];
    //         //eslint-disable-next-line no-console
    //         console.log("Rftoken--> "+ Rftoken);
    // }).catch(err=> err);

    axios({
      method: 'post',
      // url: conditionHeaderUrl,
      url:
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/webhook0',
      // headers: {
      //   'Access-Control-Allow-Headers': '*',
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      //   'X-CSRF-Token': Rftoken
      // },
      // auth: {
      //   username: 'frdemo',
      //   password: 'france01'
      // },
      data: {
        sap_description: menuDescription,
        dayPart: dayPart,
        sector: sector,
        selectedOptionsArr: selectedOptionsArr,
        Description: menuDescription,
        Source: 'MEC',
        conditionsetid: String(parseInt(Math.random() * 10000000000)),
        cycle_Text: cyclePeriod
      }
    })
      .then(response => {
        console.log('response status--> ' + response.status)
        console.log(response)
        window.location.href = '/centralMenu'
        // axios({
        //   method: 'post',
        //   url: `${SERVER_URL}/sap/opu/odata/sap/ZCM_CENTRALMENU_SRV/ZC_CONDITION(guid${response.uuid})/to_conditionlist`,
        //   headers: {
        //     'Access-Control-Allow-Headers': '*',
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     'X-CSRF-Token': Rftoken
        //   },
        //   auth: {
        //     username: 'frdemo',
        //     password: 'france01'
        //   },
        //   data: {
        //     sap_description: menuDescription,
        //     Description: menuDescription,
        //     Source: 'MEC',
        //     conditionsetid: String(parseInt(Math.random() * 10000000000)),
        //     cycle_Text: cyclePeriod
        //   }
        // })
      })
      .catch(error => {
        return { data: error.message, error }
      })
  }

  handleChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget
    console.log(name, value)
    this.setState({
      [name]: value
    })
  }

  handleMultiSelectChange = (selectedOptions: Array<Object>) => {
    console.log('selectedOptions--->', selectedOptions)
    const selectedValues = selectedOptions.map(item => {
      return item.value
    })
    this.setState({ selectedOptionsArr: selectedValues })
  }

  onSubmitCreateMenu = (e: Event) => {
    const {
      menuDescription,
      dayPart,
      sector,
      cyclePeriod,
      selectedOptionsArr
    } = this.state
    if (selectedOptionsArr.length == 0) {
      e.preventDefault()
      alert('Please select the Dish Type you want to add.')
      this.setState({ hasError: true, isValid: false })
    } else {
      e.preventDefault()
      let formData = {
        menuDescription: `${menuDescription}`,
        dayPart: `${dayPart}`,
        sector: `${sector}`,
        cyclePeriod: `${cyclePeriod}`,
        dishType: selectedOptionsArr
      }

      localStorage.setItem('createNewMenuFormData', JSON.stringify(formData))

      // this.setState({ isMenuCreated: true })
      this.postConditionHeaders()
    }
  }

  render() {
    return (
      <FlexWrapper>
        {!this.state.isMenuCreated ? (
          <form onSubmit={this.onSubmitCreateMenu} style={{ width: '100%' }}>
            <CreateMenuForm
              onChange={this.handleChange}
              handleMultiSelectChange={this.handleMultiSelectChange}
              isValid={this.state.isValid}
              hasError={this.state.hasError}
              selectedOptionsArr={this.state.selectedOptionsArr}
            />
          </form>
        ) : (
          <div style={{ width: '100%' }}>
            <Conditions />
          </div>
        )}
      </FlexWrapper>
    )
  }
}
