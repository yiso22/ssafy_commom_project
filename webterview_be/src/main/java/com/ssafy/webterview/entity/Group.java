package com.ssafy.webterview.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@DynamicInsert
@DynamicUpdate
@Table(name = "`Group`")
public class Group {
	@Id
	@Column(name = "GroupNo", nullable = false)
	private Integer groupNo;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "UserNo", nullable = false)
	private User user;

	@Column(name = "GroupStartDate")
	private Instant groupStartDate;

	@Column(name = "GroupCode", length = 45)
	private String groupCode;

	@Column(name = "GroupEndDate")
	private Instant groupEndDate;

	@Column(name = "GroupBlind")
	private Boolean groupBlind;

}