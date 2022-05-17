import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Question.scss';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as BsIcons from 'react-icons/bs';
import HomeHeader from '../../../HomePage/HomeHeader';
import Footer from '../../../HomePage/Footer';
import * as actions from '../../../../store/actions'
import { tronbangService, getQuestionHomeService, checkQuestionService } from '../../../../services/questionService'
import { LANGUAGES } from '../../../../utils'
import { dispatch } from '../../../../redux';

class Question extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrLessonItems: [],
            arrQuestions: [],
            answer: [],
            true: 0,
            false: 0,
            action: '',
            answerUser: [],
        }
    }
    async componentDidMount() {
        let allQuestions = await getQuestionHomeService(16);
        // console.log("check temp 123456789:", allQuestions.data)
        this.state.arrQuestions =  allQuestions.data
        if(allQuestions)
        {
            let mang = this.state.arrQuestions

            mang.map( async(item, index) => {
            let temp = await tronbangService(item.id);
            console.log("check temp", temp.data, index)
            this.state.answer.push(temp.data)
            })
        }
        
   
        this.props.loadTopLessonItems();
        this.props.fetchAllLessonItemsStart();
        this.props.fetchAllQuestionsStart();

        
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topLessonItemsRedux !== this.props.topLessonItemsRedux){
            this.setState({
                arrLessonItems: this.props.topLessonItemsRedux
            })
        }
    }

    async hanldeOnclickda1(da , id) 
    {
        console.log("chọn", da)
        this.state.answerUser.push(da)
        console.log("check answerUser", this.state.answerUser)
        this.state.action = 1
        let check = await checkQuestionService({
            id: id,
            answer: da,
        })
        
        if(check === true)
        {
            this.state.true ++;
            // this.state.action = true
            console.log("check action", this.state.action)
        }
        else
        {
            this.state.false++
        }
        console.log("check true", this.state.true);
        console.log("check false", this.state.false);
    }
    async hanldeOnclickda2(da , id) 
    {
        console.log("chọn", da)
        this.state.answerUser.push(da)
        console.log("check answerUser", this.state.answerUser)
        this.state.action = 1
        let check = await checkQuestionService({
            id: id,
            answer: da,
        })
        
        if(check === true)
        {
            this.state.true ++;
            // this.state.action = true
            console.log("check action", this.state.action)
        }
        else
        {
            this.state.false++
        }
        console.log("check true", this.state.true);
        console.log("check false", this.state.false);
    }
    async hanldeOnclickda3(da , id) 
    {
        console.log("chọn", da)
        this.state.answerUser.push(da)
        console.log("check answerUser", this.state.answerUser)
        this.state.action = 1
        let check = await checkQuestionService({
            id: id,
            answer: da,
        })
        
        if(check === true)
        {
            this.state.true ++;
            // this.state.action = true
            console.log("check action", this.state.action)
        }
        else
        {
            this.state.false++
        }
        console.log("check true", this.state.true);
        console.log("check false", this.state.false);
    }
    async hanldeOnclickda4(da , id) 
    {
        console.log("chọn", da)
        this.state.answerUser.push(da)
        console.log("check answerUser", this.state.answerUser)
        this.state.action = 1
        let check = await checkQuestionService({
            id: id,
            answer: da,
        })
        
        if(check === true)
        {
            this.state.true ++;
            // this.state.action = true
            console.log("check action", this.state.action)
        }
        else
        {
            this.state.false++
        }
        console.log("check true", this.state.true);
        console.log("check false", this.state.false);
    }
    handleOnclickSubmit() {
        alert("Đáp án đúng: "+this.state.true+ "Đáp án sai: "+this.state.false);
    }
        render  () {
        let { language } = this.props
        let allLessonItems = this.state.arrLessonItems;
        let allQuestions = this.state.arrQuestions;
        console.log("allQuestions", allQuestions.length);
        let action = this.state.action
        let answer =  this.state.answer;
        console.log("check action", this.state.action)
        return (
            <div>
                
                <HomeHeader />
                <div className="container">     
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-6">

                            {allQuestions && allQuestions.length>0 && answer && answer.length>0 &&
                            allQuestions.map((item, index) => {
                                console.log("check item", item);
                                    // let nameVi = `${item.question}`;
                                    // let nameEn = `${item.lessonName}`;
                                    let da1 = '';
                                    let da2 = '';
                                    let da3 = '';
                                    let da4 = '';
                                    if(answer[index].answerTrue)
                                    {
                                        da1 = answer[index].answerTrue;
                                        da2 = answer[index].answerFalse1;
                                        da3 = answer[index].answerFalse2;
                                        da4 = answer[index].answerFalse3;
                                    }else if(answer[index].answerFalse1)
                                    {
                                        da2 = answer[index].answerFalse1;
                                        da1 = answer[index].answerTrue;
                                        da3 = answer[index].answerFalse2;
                                        da4 = answer[index].answerFalse3;
                                    }else if(answer[index].answerFalse2)
                                    {
                                        da3 = answer[index].answerFalse2;
                                        da1 = answer[index].answerTrue;
                                        da2 = answer[index].answerFalse1;
                                        da4 = answer[index].answerFalse3;

                                    }
                                    else
                                    {
                                        da4 = answer[index].answerFalse3;
                                        da1 = answer[index].answerTrue;
                                        da2 = answer[index].answerFalse1;
                                        da3 = answer[index].answerFalse2;
                                    }

                                    let mang = [da1,da2,da3,da4]
                                    
                                    mang.sort(() => Math.random() - 0.5)
                                    return(
                                    <div className="row" key={index}>
                                        <div className="col-6 card-content">
                                            
                                            <div className="question">{item.question}</div>
                                                <div>
                                                    <div className={this.state.action == 1 ? "answer dachon" : "answer chuachon"} 
                                                        value={mang[0]}
                                                    onClick={()=>this.hanldeOnclickda1(mang[0], item.id)}
                                                    >A. {mang[0]}
                                                    </div>

                                                    <div className="answer"
                                                    onClick={()=>this.hanldeOnclickda1(mang[1], item.id)}
                                                    value={mang[1]}
                                                    >B. {mang[1]}
                                                    </div>

                                                    <div className="answer"
                                                    onClick={()=>this.hanldeOnclickda1(mang[2], item.id)}
                                                    value={mang[2]}
                                                    >C. {mang[2]}
                                                    </div>

                                                    <div className="answer"
                                                    onClick={()=>this.hanldeOnclickda1(mang[3], item.id)}
                                                    value={mang[3]}
                                                    >D. {mang[3]}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                            })}
                            <div className="mt-5 float-right">
                                <button className='btn btn-primary'
                                    onClick={()=>this.handleOnclickSubmit()}
                                >SUBMIT</button>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            isLoggedIn: state.user.isLoggedIn,
            topLessonItemsRedux: state.admin.topLessonItems,
            topQuestionsRedux: state.admin.topQuestions
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            loadTopLessonItems: () => dispatch(actions.fetchTopLessonItem()),
            fetchAllLessonItemsStart: () => dispatch(actions.fetchAllLessonItemsStart()),
            fetchTopQuestionList: (lessonId) => dispatch(actions.fetchTopQuestionList(lessonId)),




            fetchAllQuestionsStart: () => dispatch(actions.fetchAllQuestionsStart()),
            tronbang: (id) => dispatch(actions.tronbang(id)),
        };
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(Question);