CREATE TABLE member(
    member_id nvarchar2(100) CONSTRAINT member_id_pk primary key,
    member_pw nvarchar2(100)
);

CREATE TABLE device(
    device_id number CONSTRAINT device_id_pk primary key,
    device_name nvarchar2(100),
    member_id number CONSTRAINT device_member_id_pk REFERENCES member(member_id),
    isConnect char(1)
    state char(1)
);