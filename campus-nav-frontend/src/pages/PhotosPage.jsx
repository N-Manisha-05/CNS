import React from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
export default function PhotosPage() {
  return (
   
    <>
     <Navbar/>
     
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Campus Photos</h2>
        <div className="container">
          <div className="row g-4">
            {/* Card for Block A */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/bg.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">CENTRAL LIBRARY</h5>
                </div>
              </div>
            </div>
            {/* Card for Block B */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/1.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">RGUKT ENTRANCE</h5>
                </div>
              </div>
            </div>
            {/* Card for Library */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/2.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">ACADEMIC BLOCK 2</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/3.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">RGUKT NATURE VIEW</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/4.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title"></h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/5.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">RGUKT LOGO</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/6.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">DEPARTMENTS</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/7.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">CSE BLOCK</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/classroom.webp" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">CLASSROOM</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/8.jpeg" alt="Block A" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">RGUKT GROUND</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/10.jpeg" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">ACADEMIC BLOCK 1</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/11.jpeg" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">NATURE VIEW</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/13.jpeg" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">SHOPPING COMPLEX</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/14.jpeg" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">COMPUTER CENTER</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/91.avif" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">ECE BLOCK</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/92.jpeg" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">OLD CAMPUS</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/93.jpeg" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title"> OLD CAMPUS</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/94.jpeg" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">OLD CAMPUS</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card h-100">
                <img src="/images/95.webp" alt="ACADEMIC BLOCK 1" className="card-img-top rounded-lg"   style={{ height: "200px", objectFit: "cover" }}/>
                <div className="card-body text-center">
                  <h5 className="card-title">MESS</h5>
                </div>
              </div>
            </div>
            {/* Additional cards */}
            {/* You can add more images here using the same structure */}
          </div>
        </div>
      </div>
      
    </>
  );
}
