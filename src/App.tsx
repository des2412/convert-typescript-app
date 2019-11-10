import axios from 'axios';
import BorderWrapper from 'react-border-wrapper'
import { Form, FormGroup, Input, Label, Button, Container, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './App.css';
import { properties } from './properties.js';
import React from 'react';
import * as ReactDOM from 'react-dom';

export default class App extends React.Component {

  state = {
    isLoading: false, dropDownOpen: false, dropdownvalue: 'Select', toggle: true,
  };

  async handleSubmit(event) {
    event.preventDefault();
    const selectedLang = this.state.dropdownvalue;
    const numberInput = event.target.number.value;
    const object = {};
    object['number'] = numberInput;
    object['lang'] = selectedLang;
    const json = JSON.stringify(object);
    if (properties.log_out)
      console.log('JSON Conversion Request:' + json);

    const post = properties.post

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    await axios.post(post,
      json, config).then(res => {
        const element = <Col sm={{ size: 'auto', offset: 4 }}><p>Word for {numberInput} in {selectedLang}</p></Col>
        const elemval = <Col sm={{ size: 'auto', offset: 4 }}><p>{res.data}</p></Col>;
        ReactDOM.render(element,
          document.getElementById('result')
        );
        ReactDOM.render(elemval,
          document.getElementById('result-val')
        );

      })
      .catch(e => {
        console.log('Error: ', e)
      });

  }

  handleChange = (event) => {
    console.log('selected language:' + event.target.innerText)
    this.setState({ dropdownvalue: event.target.innerText, dropDownOpen: false }, () =>
      console.log('Updated language:' + this.state.dropdownvalue)
    );
  }


  toggle = () => {

    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  }
  render = () => {
    const minm = properties.minm
    const maxm = properties.maxm

    return (

      <Container className="App">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <BorderWrapper borderWidth='1px' borderType='dotted'>
            <Col sm={{ size: 'auto', offset: 3 }}> <p><strong>Invokes AWS Lambda Function</strong></p>
            </Col>
            <Col sm={{ size: 'auto', offset: 1 }}><strong>Conversion Parameters</strong></Col>
            <Col sm={{ size: 'auto', offset: 4 }}>
              <FormGroup row>
                <Label for="number">Number</Label>
                <Input id="number" min={minm} max={maxm} name="number" type="number" />
              </FormGroup>
            </Col>

            <Col sm={{ size: 'auto', offset: 4 }}>
              <FormGroup row>
                <Label for="lang">Language</Label>
              </FormGroup>
            </Col>

            <Col sm={{ size: 'auto', offset: 4 }}>
              <FormGroup row>
                <Dropdown id="lang" isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    Language
                        </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.toggle} dropDownValue="Select">Select</DropdownItem>
                    <DropdownItem onClick={this.handleChange}>NL</DropdownItem>
                    <DropdownItem onClick={this.handleChange}>DE</DropdownItem>
                    <DropdownItem onClick={this.handleChange}>UK</DropdownItem>
                    <DropdownItem onClick={this.handleChange}>FR</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Col>

            <Col sm={{ size: 'auto', offset: 4 }}>
              <FormGroup row>
              </FormGroup>
            </Col>
            <Col sm={{ size: 'auto', offset: 4 }}>
              <FormGroup row>

                <Button>Convert</Button>

              </FormGroup>
            </Col>

          </BorderWrapper>

        </Form>
      </Container>


    );

  }
}

