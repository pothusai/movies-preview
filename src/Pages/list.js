import React, { useEffect, useState } from "react";
import { Input, PageHeader, Button, Image, Divider, Row, Col, Tooltip, Carousel} from "antd";
import { ArrowUpOutlined, CaretRightOutlined, ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons'
import { useHistory } from "react-router-dom";
import Pagination from 'react-responsive-pagination';
const { Search } = Input;

const style = {
    padding: '8px 0',
}

const imgurl = "data:image/jpeg;base64,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"
function Lists() {
    const [movies, setMovies] = useState([]) 
    const pageSize =  12
    const [totalRecords, setTotalRecords] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const history = useHistory()
    useEffect(() => {
        fetchData(currentPage)
    }, [])
    const fetchData = page => {
        fetch(`http://localhost:8080/movies/${page}`).then(res => res.json())
            .then(res => {
                setMovies(res.data)
                setCurrentPage(page)
                setTotalRecords(res.totalRecords)
            })
    }
    const handlePreview = id => {
        history.push(`/movie/${id}`)
    }
    const handlePrev = e => {
        fetchData(currentPage-1)
    }
    const handlenext = e => {
        fetchData(currentPage+1)
    }
    const handleSearch = e => {
        fetch(`http://localhost:8080/movie-search/${e}`).then(res => res.json())
        .then(res => {
            setMovies(res.data)
            setCurrentPage(1)
            setTotalRecords(res.totalRecords)
        })
    }
    return (
        <div>
            <PageHeader
                title="Insta Play"
                extra={[
                    <Search placeholder="Search movies" onSearch={handleSearch} enterButton />
                ]}
            >

            </PageHeader>
            <Carousel >
                <div>
                    <img src={imgurl} style={{ width: "100%" }} />
                </div>
            </Carousel>
            <h1>Ternding</h1>
            {visible && <div>
                preview-data

            </div>}
            <Row gutter={[16, 24]}>
                {
                    movies.map(movie => {
                        return (
                            <Col className="gutter-row" span={{ xs: 8, sm: 16, md: 24, lg: 32 }} key={movie.id}>
                                <div style={style}>
                                    <Image
                                        style={{ width: "100%" }} src={imgurl}
                                        onClick={e => handlePreview(movie.id)}
                                        preview={{ visible: false }}
                                    >
                                    </Image>

                                    <div >
                                        <div style={{ float: "left" }}>
                                            <div>
                                                {movie.title}
                                            </div>
                                            <div>
                                                <ArrowUpOutlined />
                                                {movie.rating} / 5
                                            </div>
                                        </div>
                                        <div style={{ float: "right" }} >
                                            <CaretRightOutlined />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <div style={{height:"30px",background:"#000"}} >
                <Tooltip title="back">
                    <Button 
                        disabled={currentPage === 1}
                        style={{border:"transparent", background: "transparent", color:'#fff'}} 
                    onClick={handlePrev} icon={<ArrowLeftOutlined />  } />
                </Tooltip>
                <Tooltip title="next">
                    <Button 
                        disabled={currentPage * pageSize > totalRecords }
                    style={{border:"transparent", background: "transparent", color:'#fff'}} 
                    onClick={handlenext} icon={<ArrowRightOutlined /> } />
                </Tooltip>
            </div>
        </div>
    )
}


export default Lists