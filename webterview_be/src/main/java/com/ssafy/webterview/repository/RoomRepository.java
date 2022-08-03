package com.ssafy.webterview.repository;

import com.ssafy.webterview.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
	List<Room> findByGroupGroupNo(int groupNo);
}