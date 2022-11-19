const db = require('../DB/dbConn')
const exception = require('../Exception')

const { Class, Sequelize, Member } = db
const { Op } = Sequelize
const { Exception } = exception
const ErrorCode = 201

module.exports = class {
  async getMember(memberId) {
    try {
      return await Class.findOne({
        where: {
          memberIdsId,
          [Op.and]: Sequelize.literal('status & 64 != 64'),
        },
      })
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  // 모든 클래스 불러오기
  async getClasses() {
    try {
      return await Class.findAll(
        {
          where: {
            [Op.and]: Sequelize.literal('status & 64 != 64'),
          },
        },
        Sequelize.literal('status & 64 != 64'),
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  // 범위 안의 클래스 불러오기
  async getClassList(
    offset,
    limit,
    option = { orderBy: ['createdAt'], asc: [true] },
  ) {
    try {
      const order = []

      for (let i = 0; i < option.length; i += 1) {
        order.push([option[i].id, option[i].asc ? 'ASC' : 'DESC'])
      }

      return await Class.findAll({
        attributes: ['classId', 'className', 'status'],
        order,
        offset,
        limit,
      })
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  async getUserClass(userId) {
    try {
      return (
        await Member.findAll({
          include: [
            {
              model: Class,
              where: {
                [Op.and]: Sequelize.literal('class.status & 64 != 64'),
              },
            },
          ],
          where: {
            userId,
            [Op.and]: Sequelize.literal('class_members.status & 64 != 64'),
          },
        })
      ).map((x) => x.dataValues.class)
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  async searchClass(keyword) {
    try {
      return await Class.findAll({
        where: {
          className: {
            [Op.like]: `%${keyword}%`,
          },
          [Op.and]: Sequelize.literal('status & 64 != 64'),
        },
      })
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  // 수업 추가함수, className : 교과명
  // 성공했다면 true 반환
  createClass = async (className, userId, classImageId) => {
    let classId = null

    try {
      classId = (
        await Class.create({
          className,
          classImageId,
          status: 0,
        })
      ).dataValues.classId
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, 'type error'))
    }

    try {
      await Member.create({
        classId,
        userId,
        status: 2,
      })

      return classId
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  toggleMemberJob = async (classId, userId) => {
    try {
      return (
        (await Member.update(
          {
            status: Sequelize.literal(`status ^ 1`),
          },
          {
            where: {
              classId,
              userId,
              [Op.and]: Sequelize.literal('status & 64 != 64'),
            },
          },
        )) != null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  updateClass = async (classId, className) => {
    try {
      return (
        (await Class.update(
          {
            className,
          },
          {
            where: {
              classId,
              [Op.and]: Sequelize.literal('status & 64 != 64'),
            },
          },
        )) !== null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  updateClassImage = async (classId, classImageId) => {
    try {
      return (
        (await Class.update(
          { classImageId },
          {
            where: {
              classId,
              [Op.and]: Sequelize.literal('status & 64 != 64'),
            },
          },
        )) != null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  // 내 수업 삭제 함수
  deleteMyClass = async (classId, userId) => {
    try {
      return (
        (await Member.update(
          {
            status: Sequelize.literal('status | 64'),
          },
          {
            where: {
              classId,
              userId,
              [Op.and]: Sequelize.literal('status & 64 != 64'),
            },
          },
        )) != null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  async getMyClassOne(classId, userId) {
    try {
      return await Member.findOne({
        where: {
          classId,
          userId,
          [Op.and]: Sequelize.literal('status & 64 != 64'),
        },
      })
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
    }

    return null
  }

  // 내 수업 추가함수
  async addMyClass(classId, userId, status = 1) {
    try {
      return (
        Member.create({
          classId,
          userId,
          status,
        }) !== null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  // 수업 삭제함수
  async deleteClass(classId) {
    try {
      await Class.update(
        {
          status: Sequelize.literal('status | 64'),
        },
        {
          where: {
            classId,
          },
        },
      )

      await Member.update(
        {
          status: Sequelize.literal('status | 64'),
        },
        {
          where: {
            classId,
          },
        },
      )

      return true
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  // 관리자가 유저를 영원히 삭제하고 싶을때 쓰는 함수
  async deleteClassForever(classId) {
    try {
      return (
        (await Class.destroy({
          where: { classId },
        })) !== null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  // ClassTeacher에 컬럼을 추가하는 함수
  async createTeacher(classId, teacher = []) {
    try {
      const promiseList = []
      for (let i = 0; i < teacher.length; i += 1) {
        promiseList.push(
          Member.create({
            userId: teacher[i],
            classId,
            status: 0,
          }),
        )
      }

      if ((await Promise.all(promiseList)).some((x) => !x)) {
        return false
      }

      return true
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }

  // 관리자라면 2, 교사라면 0, 학생이라면 1을 반환, 해당 클래스에 유저가 없다면 null을 반환
  async getUserJob(classId, userId) {
    try {
      const status = await Member.findOne({
        attributes: ['status'],
        where: {
          classId,
          userId,
          [Op.and]: Sequelize.literal('status & 64 != 64'),
        },
      })

      if (!status) {
        return null
      }

      return status.dataValues.status & 3
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return null
    }
  }

  async kickUser(classId, userId) {
    try {
      await Member.update(
        {
          status: Sequelize.literal('status | 64'),
        },
        {
          where: {
            classId,
            userId,
          },
        },
      )

      return true
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode), err.message)
      return false
    }
  }

  // 수업이 삭제되었다면 삭제취소를 해줌
  restoreClass = async (classId) => {
    try {
      return (
        (await Class.update(
          {
            status: Sequelize.literal(`status & 63`),
          },
          {
            where: {
              classId,
            },
          },
        )) != null
      )
    } catch (err) {
      exception.addThrow(new Exception(ErrorCode, err.message))
      return false
    }
  }
}
